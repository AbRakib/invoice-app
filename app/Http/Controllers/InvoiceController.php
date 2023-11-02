<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller {

    public function get_all_invoice() {
        $invoices = Invoice::with( 'customer' )->orderBy( 'id', 'DESC' )->paginate( 10 );
        return response()->json( [
            'invoices' => $invoices,
        ], 200 );

    }

    public function search_invoice( Request $request ) {
        $search = $request->get( 's' );
        if ( $search != null ) {
            $invoices = Invoice::with( 'customer' )
                ->where( 'id', 'LIKE', "%$search%" )
                ->orWhere( 'number', 'LIKE', "%$search%" )
                ->orWhere( 'date', 'LIKE', "%$search%" )
                ->orWhere( 'due_date', 'LIKE', "%$search%" )
                ->get();
            return response()->json( [
                'invoices' => $invoices,
            ], 200 );
        } else {
            return $this->get_all_invoice();
        }
    }

    public function create_invoice( Request $request ) {
        $counter = Counter::where( 'key', 'invoice' )->first();
        $random = Counter::where( 'key', 'invoice' )->first();

        $invoice = Invoice::orderBy( 'id', 'DESC' )->first();
        if ( $invoice ) {
            $invoice = $invoice->id + 1;
            $counters = $counter->value + $invoice;
        } else {
            $counters = $counter->value;
        }

        $formData = [
            'number'              => $counter->prefix . $counters,
            'customer_id'         => null,
            'customer'            => null,
            'date'                => date( 'Y-m-d' ),
            'due_date'            => null,
            'reference'           => null,
            'discount'            => 0,
            'term_and_conditions' => 'Default Term & Conditions',
            'items'               => [
                [
                    'product_id' => null,
                    'product'    => null,
                    'unit_price' => 0,
                    'quantity'   => 1,
                ],
            ],
        ];
        return response()->json( $formData );
    }

    public function add_invoice( Request $request ) {
        $invoiceData['sub_total'] = $request->subtotal;
        $invoiceData['total'] = $request->total;
        $invoiceData['customer_id'] = $request->customer_id;
        $invoiceData['number'] = $request->number;
        $invoiceData['date'] = $request->date;
        $invoiceData['due_date'] = $request->due_date;
        $invoiceData['discount'] = $request->discount;
        $invoiceData['reference'] = $request->reference;
        $invoiceData['terms_and_conditions'] = $request->terms_and_conditions;

        $invoice = Invoice::create( $invoiceData );

        $invoiceItem = $request->invoice_item;
        if ( $invoiceItem ) {
            foreach ( json_decode( $invoiceItem ) as $item ) {
                $itemData['product_id'] = $item->id;
                $itemData['invoice_id'] = $invoice->id;
                $itemData['quantity'] = $item->quantity;
                $itemData['unit_price'] = $item->unit_price;
                InvoiceItem::create( $itemData );
            }
        }
    }

    public function show_invoice( $id ) {
        $invoice = Invoice::with( ['customer', 'invoice_items.product'] )->find( $id );
        return response()->json( [
            'invoice' => $invoice,
        ], 200 );
    }

    public function edit_invoice( $id ) {
        $invoice = Invoice::with( ['customer', 'invoice_items.product'] )->find( $id );
        return response()->json( [
            'invoice' => $invoice,
        ], 200 );
    }

    public function delete_invoice_items( $id ) {
        $invoiceItem = InvoiceItem::findOrFail( $id );
        $invoiceItem->delete();
    }

    public function update_invoice( Request $request, $id ) {
        $invoice = Invoice::where( 'id', $id )->first();

        $invoice->sub_total = $request->subtotal;
        $invoice->total = $request->total;
        $invoice->customer_id = $request->customer_id;
        $invoice->number = $request->number;
        $invoice->date = $request->date;
        $invoice->due_date = $request->due_date;
        $invoice->discount = $request->discount;
        $invoice->reference = $request->reference;
        $invoice->terms_and_conditions = $request->terms_and_conditions;

        $invoice->update( $request->all() );

        $invoiceItem = $request->invoice_item;
        $invoice->invoice_items()->delete();
        foreach ( json_decode( $invoiceItem ) as $item ) {
            $itemData['product_id'] = $item->product_id;
            $itemData['invoice_id'] = $invoice->id;
            $itemData['quantity'] = $item->quantity;
            $itemData['unit_price'] = $item->unit_price;
            InvoiceItem::create( $itemData );
        }

    }

    public function delete_invoice( $id ) {
        $invoice = Invoice::findOrFail( $id );
        $invoice->invoice_items()->delete();
        $invoice->delete();
    }

}
