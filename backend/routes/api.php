<?php

use Illuminate\Http\Request;

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

Route::get('/hello', function () {
    $helloObject = new stdClass();
    $helloObject->msg = "Hello world!";
    return json_encode($helloObject);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('register', 'Auth\RegisterController@register');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
], function ($router) {
    Route::put('/{id}', 'UserController@update');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'classes'
], function ($router) {
    Route::post('/{userId}', 'ClassController@create');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
