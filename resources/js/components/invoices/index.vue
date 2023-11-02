<script setup >
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Bootstrap4Pagination } from 'laravel-vue-pagination';


const router = useRouter();

let invoices = ref({'data':[]});
let searchInvoice = ref([]);
let name = ref('');

name = localStorage.getItem('name');

onMounted(async () => {
    getInvoices();
});

const getInvoices = async (page) => {
    let response = await axios.get(`/api/get_all_invoice?page=${page}`)
    invoices.value = response.data.invoices;
}

const search = async () => {
    let response = await axios.get('/api/search_invoice?s=' + searchInvoice.value);
    console.log('response', response.data.invoices);
    invoices.value = response.data.invoices;
}

const newInvoice = async () => {
    let form = await axios.get('/api/create_invoice');
    console.log('form', form.data);
    router.push('/invoice/new');
}

const onShow = (id) => {
    router.push('/invoice/show/' + id)
}

function logoutUser() { 
    localStorage.removeItem('token');
    router.push('/');
 }


</script>

<template>
    <div class="container my-5">
        <div class="">
            <div class="row">
                <div class="col-md-6">
                    <h2>Invoices <span class="fw-bold h4 mx-5 text-success">User: Welcome {{ name }}</span> </h2>
                </div>
                <div class="col-md-6 text-end">
                    <button type="submit" class="btn btn-sm btn-danger mx-2" @click="logoutUser">Logout</button>
                    <a class="btn btn-success btn-sm" @click="newInvoice">
                        New Invoice
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search Invoice" aria-label="RSearch Invoice" aria-describedby="basic-addon2" v-model="searchInvoice" @keyup="search()">
                        <span class="input-group-text" id="basic-addon2">Search Invoice</span>
                    </div>
                </div>
            </div>
            <table class="table table-success table-striped myTable" id="myTable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Number</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody v-if="invoices.data.length >= 1">
                    <tr v-for="item in invoices.data" :key="item.id">
                        <th scope="row">
                            <a href="#" @click="onShow(item.id)">{{ item.id }}</a>
                        </th>
                        <td>{{ item.date }}</td>
                        <td>{{ item.number }}</td>
                        <td v-if="item.customer">{{ item.customer.firstname }}</td>
                        <td v-else></td>
                        <td>{{ item.due_date }}</td>
                        <td>{{ item.total }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        Invoice Not Found
                    </tr>
                </tbody>
            </table>
            <div class="mx-5">
                <Bootstrap4Pagination :data="invoices" @pagination-change-page="getInvoices" />
            </div>
        </div>
    </div>
</template>