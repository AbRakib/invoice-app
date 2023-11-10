<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// })->name('home');

// Route::get('/{pathMatch?}', function(){
//     return view('welcome');
// })->where('pathMatch', ".*");

Route::get('/', [LoginController::class, 'home']);
Route::get('/{any}', [LoginController::class, 'home'])->where('any', '.*');