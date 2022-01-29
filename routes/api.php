<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', "LoginController@login");
Route::post('logout', "LoginController@logout");

Route::group(["middleware"=>'auth:sanctum'], function () {
    // TODO:Auth認証が必要なAPIのルートを書く！
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    // 写真投稿
    Route::post('/photos', 'PhotoController@store')->name('photo.store');
    // 写真一覧
    Route::get('/photos', 'PhotoController@index')->name('photo.index');
    // 写真詳細
    Route::get('/photo/{id}', 'PhotoController@show')->name('photo.show');
    // 写真ダウンロード
    Route::post('/photo/{id}/download', 'PhotoController@download')->name('photo.download');
});
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
