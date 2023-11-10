<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller {

    // check login
    public function login( Request $request ) {

        $this->validate( $request, [
            'email'    => 'required|email',
            'password' => 'required|min:3',
        ] );

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken( 'MyApp' )->plainTextToken;
            $success['name'] = $user->name;

            return response()->json( [
                'success' => true,
                'data'    => $success,
                'message' => "User Login Successful",
            ], 200 );
        } else {
            return response()->json( [
                'success' => false,
                'message' => "User Unauthorized",
            ]);
        }

    }

    // registration
    public function store( Request $request ) {

        // $validator = Validator::make( $request->all(), [
        //     'name'     => 'required',
        //     'email'    => 'required|email',
        //     'password' => 'required|min:3',
        // ] );

        // if ( $validator->fails() ) {
        //     $response = [
        //         'success' => false,
        //         'message' => $validator->errors(),
        //     ];
        //     return response()->json( $response, 400 );
        // }

        // $data = request()->all();
        $user = new User();
        $user->name = $request->input( 'name' );
        $user->email = $request->input( 'email' );
        $user->password = bcrypt( $request->input( 'password' ) );
        $user->save();

        $success['token'] = $user->createToken( 'MyApp' )->plainTextToken;
        $success['name'] = $user->name;

        return response()->json( [
            'success' => true,
            'data'    => $success,
            'message' => "User Register Successful",
        ], 200 );

    }

    // logout user
    public function logout( Request $request ) {
        // Auth::logout();
        $request->session()->flush();
        $success['token'] = '';
        auth()->logout();
        // return redirect()->route('login');
        return response()->json( [
            'data' => "success",
        ], 200 );
    }

    public function home() {
        return view('welcome');
    }
}
