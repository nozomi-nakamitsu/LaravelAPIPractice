<?php

namespace App\Services;

use App\Repositories\PhotoRepository ;
use App\Http\Requests\StorePhoto;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use \Symfony\Component\HttpFoundation\Response;
use App\Models\Photo;

class PhotoCreator
{
    public function __construct(PhotoRepository $PhotoRepository)
    {
        $this->PhotoRepository = $PhotoRepository;
    }
    /**
     * Create Photo.
     * @param StorePhoto $request
     * @return mixed
     */
    public function execute(StorePhoto $request)
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
}
