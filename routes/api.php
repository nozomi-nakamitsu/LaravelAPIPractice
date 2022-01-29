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
});
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
