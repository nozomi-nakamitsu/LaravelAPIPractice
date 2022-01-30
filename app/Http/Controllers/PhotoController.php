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
use \Symfony\Component\HttpFoundation\Response;
use App\Repositories\PhotoRepository;
use App\Services\PhotoCreator;

/**
 * 写真投稿
 * @param StorePhoto $request
 * @return \Illuminate\Http\Response
 */

class PhotoController extends Controller
{



     /**
     * WorkspaceController constructor.
     * @param PhotoRepository $PhotoRepository

     */

    public function __construct(
        PhotoRepository $photoRepository,
        PhotoCreator $photoCreator
    ) {
        // 認証が必要
        $this->middleware('auth');
        $this->photoRepository = $photoRepository;
        $this->photoCreator = $photoCreator;
    }
    public function store(StorePhoto $request)
    {
        return $this->photoCreator->execute($request);
    }
    
    /**
     * 写真一覧
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $userId=Auth::user()->id;
            $photos = $this->photoRepository->with(['user',"likes"])->orderBy(Photo::CREATED_AT, 'desc')->get();
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
            $photo =$this->photoRepository->with(['user'])->where('id', $photoId)->first();
            return response()->json($photo, 200);
        } catch (\Exception $exception) {
            return response()->json([], 500);
        }
    }
    /**
     * 写真ダウンロード
     * @param Int $photoId
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

    /**
     * いいねする
     *
     * NOTE:
     * likes テーブルに当たるモデルクラスは外部キーしか中身のない中間テーブルになるので作成しません!
     * リレーションの機能を使えば関連するモデルから間接的に中間テーブルを操作することができる。
     * @param Int $photoId
     * @return \Illuminate\Http\Response
     */
    public function favorite(int $photoId)
    {
        DB::transaction(function () use ($photoId) {
            $photo=  $this->photoRepository->where("id", $photoId)->with(["likes"])->first();

            if (! $photo) {
                abort(404);
            }
            $photo->likes()->detach(Auth::user()->id);
            $photo->likes()->attach(Auth::user()->id);
        });
        return response(["photo_id" => $photoId], Response::HTTP_OK);
    }
    /**
     * いいねを解除する
     *
     * @param Int $photoId
     * @return \Illuminate\Http\Response
     */
    public function unfavorite(int $photoId)
    {
        DB::transaction(function () use ($photoId) {
            $photo=  $this->photoRepository->where("id", $photoId)->with(["likes"])->first();
            if (! $photo) {
                abort(404);
            }
            $photo->likes()->detach(Auth::user()->id);
        });
        return response(["photo_id" => $photoId], Response::HTTP_OK);
    }
}
