<script setup>
import axios from "axios";
import moment from "moment";
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

    const router = useRouter()
    
    let form = ref({ id:'' })

    const props = defineProps({
        id:{
            type:String,
            default:''
        }
    })

    onMounted( async () => {
        getInvoice()
    })

    const getInvoice = async () => {
        let response = await axios.get(`/api/show_invoice/${props.id}`)
        form.value = response.data.invoice;
    }

    const print = () => {
        window.print()
        router.push('/').catch(()=>{})
    }

    const onEdit = (id) => {
        router.push('/invoice/edit/'+id)
    }
    const onDelete = (id) => {
        axios.get('/api/delete_invoice/'+id)
        router.push('/')
    }
</script>

<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-6">
                <router-link to="/">
                    <button class="btn btn-sm btn-secondary mx-2">
                        <i class=" fas fa-reply"></i>
                        Back
                    </button>
                </router-link>
                
            </div>
            <div class="col-md-6 text-end">
                <button class="btn btn-sm btn-primary mx-2" @click="print()">
                    <i class="fas fa-print"></i>
                    Print
                </button>
                <button class="btn btn-sm btn-warning mx-2" @click="onEdit(form.id)">
                    <i class=" fas fa-pencil-alt"></i>
                    Edit
                </button>
                <button class="btn btn-sm btn-danger mx-2" @click="onDelete(form.id)">
                    <i class="fas fa-trash-alt"></i>
                    Delete
                </button>
            </div>
        </div>

        <div class="bg-white my-2">
            <div class="mx-5 py-4">
                <img src="./assets/img/logo.png" alt="" style="width: 200px;">
            </div>

            <div class="bg-warning text-end">
                <div class="text-dark d-inline-block h2 bg-light mx-5 px-5">INVOICE</div>
            </div>

            <div class="row my-2 mx-5">
                <div class="col-md-6">
                    <div>
                        <span class="h5 text-black ">Invoice To:</span>
                        <div v-if="form.customer">
                            <span class="fw-bold text-muted">{{ form.customer.firstname }}</span>
                            <br>
                            <span class="text-muted fw-bold">{{ form.customer.address }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="">
                        <div v-if="form.customer">
                            <div class="row">
                                <div class="col-md-6">
                                    <span class="fw-bold text-muted">Invoice# </span>
                                </div>
                                <div class="col-md-6 text-dark">
                                    {{ form.number }}
                                </div>
                                <div class="col-md-6">
                                    <span class="text-muted fw-bold">Date: </span>
                                </div>
                                <div class="col-md-6 text-dark">
                                    {{ moment(form.date, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm A')}}
                                </div>
                                <div class="col-md-6">
                                    <span class="text-muted fw-bold">Due Date: </span>
                                </div>
                                <div class="col-md-6 text-dark">
                                    {{ form.due_date }} 
                                </div>
                                <div class="col-md-6">
                                    <span class="text-muted fw-bold">Reference: </span>
                                </div>
                                <div class="col-md-6 text-dark">
                                    {{ form.reference }} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-5 my-5">
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in form.invoice_items" :key="item.id">
                            <th scope="row">{{ i+1 }}</th>
                            <td>{{ item.product.description }}</td>
                            <td>${{ item.unit_price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ item.unit_price * item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mx-5 text-dark">
                <div class="col-md-6">
                    <h5>Thank you for your business</h5>
                    <div>
                        <b>Terms & Conditions</b>
                        <p>{{ form.terms_and_conditions }}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-5 fw-bold text-muted">Sub Total</div>
                        <div class="col-md-5 fw-bold text-muted">${{ form.sub_total }}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-5 fw-bold text-muted">Discount</div>
                        <div class="col-md-5 fw-bold text-muted">${{ form.discount }}</div>
                    </div>
                    <div class="row bg-warning p-2 mb-5">
                        <div class="col-md-5 fw-bold text-muted">Grand Total</div>
                        <div class="col-md-5 fw-bold text-muted">${{ form.total }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>