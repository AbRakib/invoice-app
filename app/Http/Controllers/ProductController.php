<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function all_product() {
        $products = Product::orderBy( 'id', 'DESC' )->get();
        return response()->json( [
            'products' => $products,
        ], 200 );
    }

    // search product
    public function search_product(Request $request) {
        $search = $request->get( 's' );
        if ( $search != null ) {
            $products = Product::where( 'id', 'LIKE', "%$search%" )
                ->orWhere( 'item_code', 'LIKE', "%$search%" )
                ->orWhere( 'unit_price', 'LIKE', "%$search%" )
                ->get();
            return response()->json( [
                'products' => $products,
            ], 200 );
        } else {
            return $this->all_product();
        }
    }
}
