<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;

class CustomerController extends Controller {
    public function all_customer() {
        $customers = Customer::orderBy('id', 'DESC')->get();
        return response()->json([
            'customers' => $customers
        ], 200);
    }

    // get all user
    public function all_user() {
        $users = User::orderBy('id', 'DESC')->get();
        return response()->json([
            'users' => $users
        ], 200);
    }

}
