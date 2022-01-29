<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StorePhoto;
// use App\Photo;
use App\Models\Photo;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * 写真投稿
 * @param StorePhoto $request
 * @return \Illuminate\Http\Response
 */

class PhotoController extends Controller
{
    public function __construct()
    {
        // 認証が必要
        $this->middleware('auth');
    }
    public function store(StorePhoto $request)
    {
        // 投稿写真の拡張子を取得する
        $extension=$request->photo->extension();
        $photo = new Photo();
        $photo->filename=$request->photo->getClientOriginalName();
        // Storage::putFileAs('dir', $file, 'file_name'); $fileを'dir'に'file_name'という名前で保存することができるという意味
        // 第四引数はpublicを指定することで、URLによるアクセスが可能となる
        $fileName =  Storage::cloud()->putFileAs("", $request->photo, $photo->filename, 'public');
        $photo->url = Storage::disk('s3')->url($fileName);
        // トランザクションを利用する
        // DB::beginTransactionでトランザクションを開始します。DB::commitが呼ばれるまでは、データベースに反映されません。
        DB::beginTransaction();
        try {
            Auth::user()->photos()->save($photo);
            DB::commit();
            return response()->json($photo, 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Storage::cloud()->delete($photo->filename);
            return response()->json([], 500);
        }
    }
    
    /**
     * 写真一覧
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $photos =Photo::with(['user'])->orderBy(Photo::CREATED_AT, 'desc')->get();
            return response()->json($photos, 200);
        } catch (\Exception $exception) {
            return response()->json([], 500);
        }
    }
    /**
     * 写真詳細
     * @return \Illuminate\Http\Response
     */
    public function show(int $photoId)
    {
        try {
            $photo =Photo::with(['user'])->where(['id' => $photoId])->first();
            return response()->json($photo, 200);
        } catch (\Exception $exception) {
            return response()->json([], 500);
        }
    }
    /**
     * 写真ダウンロード
     * @param Photo $photo
     * @return \Illuminate\Http\Response
     */
    public function download(int $photoId)
    {
        $photo =Photo::where(['id' => $photoId])->first();
        // 写真の存在チェック
        if (! Storage::cloud()->exists($photo->filename)) {
            abort(404);
        }

        $disposition = 'attachment; filename="' . $photo->filename . '"';
        $headers = [
            'Content-Type' => 'application/octet-stream',
            'Content-Disposition' => $disposition,
        ];
        // TODO: 後で修正する
        try {
            return   Storage::download($photo->filename);
        } catch (\Exception $exception) {
            return response()->json([], 500);
        }
    }
}
