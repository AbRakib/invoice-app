<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller {
    public function all_customer() {
        $customers = Customer::orderBy( 'id', 'DESC' )->get();
        return response()->json( [
            'customers' => $customers,
        ], 200 );
    }

    // get all user
    public function all_user() {
        $users = User::orderBy( 'id', 'DESC' )->get();
        return response()->json( [
            'users' => $users,
        ], 200 );
    }

    // store customer
    public function store( Request $request ) {

        $validateData = $request->validate( [
            'firstname' => ['required'],
            'lastname'  => ['required'],
            'email'     => ['required'],
            'phone'     => ['required'],
            'address'   => ['required'],
        ] );

        $customer = new Customer();
        $customer->firstname = $request->firstname;
        $customer->lastname = $request->lastname;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->save();

        return response()->json( [
            'status' => 'success',
            'data'   => $customer,
        ] );

    }

}
