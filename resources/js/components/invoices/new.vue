<script setup>
    import axios from "axios";
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter()

    let form = ref([])
    let allCustomers = ref([])
    let allUsers = ref([])
    // let user_id = ref([])
    let searchProducts = ref([])
    let customer_id = ref([])
    let item = ref([])
    let listCart = ref([])
    let listproducts = ref([])

    let name = localStorage.getItem('name');

    const showModel = ref(false)
    const hideModel = ref(true)

    onMounted(async () => {
        indexForm()
        getAllCustomers()
        getproducts()
        getAllUsers()
    })

    const indexForm = async () => {
        let response = await axios.get('/api/create_invoice')
        form.value = response.data
    }

    const ProductSearch = async () => {
        let response = await axios.get('/api/search_product?s=' + searchProducts.value);
        // console.log('response', response.data.invoices);
        listproducts.value = response.data.products
    }

    const getAllCustomers = async () => {
        let response = await axios.get('/api/customers')
        allCustomers.value = response.data.customers
    }

    const getAllUsers = async () => {
        let response = await axios.get('/api/users')
        allUsers.value = response.data.users
    }

    const addCart = (item) => {
        console.log(item.id);
        const itemcart = {
            id: item.id,
            item_code : item.item_code,
            description: item.description,
            unit_price: item.unit_price,
            quantity : 1,
        }
        for (let i = 0; i < listCart.value.length; i++) {
            const products = listCart.value[i];
            console.log(products.id);
            if(products.id == item.id){
                alert("Already Taken This Product");
                return true;
            }
        }
        listCart.value.push(itemcart);
        // closeModel()
    }

    const removeItem = (i) => {
        listCart.value.splice(i, 1)
    }

    const openModel = () => {
        showModel.value = !showModel.value
    }
    const closeModel = () => {
        showModel.value = !hideModel.value
    }

    const getproducts = async () => {
        let response = await axios.get('/api/products')
        listproducts.value = response.data.products
    }

    const subTotal = () => {
        let total = 0
        listCart.value.map((data) => {
            total = total + (data.quantity * data.unit_price)
        })
        return total
    }
    const total = () => {
        let subtotal = subTotal()
        let discount = Math.abs(form.value.discount)
        return subtotal-discount;
    }

    const onSave = () => {
        console.log(listCart.value);
        if(listCart.value.length >= 1) {
            let subtotal = 0
            subtotal = subTotal()

            let grandTotal = 0
            grandTotal = total()

            const formData = new FormData()
            formData.append('invoice_item',JSON.stringify(listCart.value))
            formData.append('customer_id', customer_id.value)
            formData.append('date', form.value.date)
            formData.append('due_date', form.value.due_date)
            formData.append('number', form.value.number)
            formData.append('reference', name)
            formData.append('discount', Math.abs(form.value.discount))
            formData.append('subtotal', subtotal)
            formData.append('total', grandTotal)
            formData.append('terms_and_conditions', form.value.terms_and_conditions)

            axios.post("/api/add_invoice", formData)
            listCart.value = []
            router.push('/invoices')
        }
    }

    const onSaveCustomer = () => {
        const formDataCustomer = new FormData();
        formDataCustomer.append('firstname', form.value.first_name);
        formDataCustomer.append('lastname', form.value.last_name);
        formDataCustomer.append('email', form.value.customer_email);
        formDataCustomer.append('phone', form.value.customer_phone);
        formDataCustomer.append('address', form.value.customer_address);

        console.log([...formDataCustomer.entries()]);

        axios.post("/api/add_customer", formDataCustomer)
        .then(response => {
            // Handle successful response
            console.log(response.data);
            // Reset the form
            form.value.first_name = '';
            form.value.last_name = '';
            form.value.customer_email = '';
            form.value.customer_phone = '';
            form.value.customer_address = '';
            getAllCustomers();
            router.push('/invoice/new');
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
            // Handle validation errors
            console.log('Validation errors:', error.response.data.errors);
            } else {
            // Handle other errors
            console.error('Error:', error.message);
            }
        });

    };

</script>

<template>
    <div class="container">
        <div class="mb-2">
            <h2>New Invoice</h2>
            <router-link to="/">
                <button class="btn btn-sm btn-secondary mx-2">
                    <i class=" fas fa-reply"></i>
                    Back
                </button>
            </router-link>
            <!-- Button trigger customer add modal -->
            <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#customer_add">
                <i class="fa-solid fa-plus"></i>
                New Customer
            </button>
        </div>
        <div class="bg-white text-dark rounded">
            <div class="row px-5 py-3">
                <div class="col-md-4">
                    <div class="">
                        <label class="fw-bold" for="customers">Customer :</label>
                        <select name="" id="customers" class="form-control" v-model="customer_id">
                            <option :value="customer.id" v-for="customer in allCustomers" :key="customer.id">
                                {{ customer.firstname }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-4">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openModel()">
                            <i class="fas fa-cart-plus"></i> New Product
                        </button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="">
                        <label class="fw-bold" for="date">Date :</label>
                        <input id="date" placeholder="dd-mm-yyyy" type="datetime-local" class="form-control" v-model="form.date">
                        <label class="fw-bold" for="due_date">Due Date :</label>
                        <input id="due_date" type="date" class="form-control" v-model="form.due_date">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="">
                        <label class="fw-bold" for="number" >Numero :</label>
                        <input type="text" class="form-control" v-model="form.number">

                        <label class="fw-bold" for="user" >User :</label>
                        <!-- <input type="text" class="form-control" v-model="form.user"> -->
                        <p class="px-3 border rounded p-1 mt-1">{{ name }}</p>
                    </div>
                </div>
            </div>

            <div class="mx-5">
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Item Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(itemcart, i) in listCart" :key="itemcart.id">
                            <th scope="row">
                                #{{ itemcart.item_code }} {{ itemcart.description }}
                            </th>
                            <td>
                                <input type="text" class="form-control form-control-sm w-50" v-model="itemcart.unit_price">
                            </td>
                            <td>
                                <input type="text" class="form-control form-control-sm w-50" v-model="itemcart.quantity">
                            </td>
                            <td v-if="itemcart.quantity">
                                $ {{ (itemcart.quantity) * (itemcart.unit_price) }}
                            </td>
                            <td v-else></td>
                            <td class="text-danger text-center" @click="removeItem(i)">
                                <button class="btn btn-sm btn-danger px-2 py-1">x</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row px-5 my-2">
                <div class="col-md-6">
                    <label class="fw-bold text-muted" for="conditions">Terms and Conditions</label>
                    <textarea id="conditions" cols="10" rows="5" class="form-control" v-model="form.terms_and_conditions"></textarea>
                </div>
                <div class="col-md-6">
                    <label class="fw-bold text-muted" for="">Total Calculated Amount</label>
                    <div class="row g-2">
                        <div class="col-md">
                            <div class="form-floating">
                                <span class="form-control" id="subtotal">$ {{ subTotal() }}</span>
                                <label for="subtotal">Sub Total Amount</label>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-floating">
                                <input type="number" min="0" class="form-control" id="discount" v-model="form.discount">
                                <label for="discount">Discount Amount</label>
                            </div>
                        </div>
                    </div>
                    <div class="row g-2 mt-2">
                        <div class="col-md">
                            <div class="form-floating">
                                <span class="form-control" id="total">$ {{ total() }}</span>
                                <label for="total">Grand Total Amount</label>
                            </div>
                        </div>
                    </div>
                    <div class="text-end my-3">
                        <a class="btn btn-success btn-sm" @click="onSave()"><i class="fas fa-save"></i> Save</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" :class="{show: showModel}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Products Added Form</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModel()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-3">
                            <input type="text" class="form-control form-control-sm" placeholder="Search with Product id/name" v-model="searchProducts" @keyup="ProductSearch()">
                        </div>
                        <div class="text-center" v-for="(item, i) in listproducts" :key="item.id">
                            <div style="display: grid; grid-template-columns: 35px 353px 45px; align-items: center;">
                                <p class="fw-bold p-0">{{ i+1 }}.</p>
                                <p class="fw-bold text-success p-0">{{ item.item_code }} - {{ item.description }}</p>
                                <p class="p-0">
                                    <button class="btn border-success btn-sm text-success" @click="addCart(item)">
                                        <i class="fas fa-plus-circle"></i>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" @click="closeModel()">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- add customer modal  -->
        <div class="modal fade" id="customer_add" tabindex="-1" aria-labelledby="customer_addLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="customer_addLabel">Customer Add</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="p-2">
                        <div class="mb-2">
                            <label for="firstName" class="form-label small">First Name</label>
                            <input type="text" class="form-control form-control-sm" name="first_name" id="firstName" v-model="form.first_name" required>
                        </div>
                        <div class="mb-2">
                            <label for="lastName" class="form-label small">Last Name</label>
                            <input type="text" class="form-control form-control-sm" name="last_name" id="lastName" v-model="form.last_name" required>
                        </div>
                        <div class="mb-2">
                            <label for="customerEmail" class="form-label small">Email address</label>
                            <input type="email" class="form-control form-control-sm" name="customer_email" id="customerEmail" aria-describedby="emailHelp" v-model="form.customer_email" required>
                        </div>
                        <div class="mb-2">
                            <label for="phone" class="form-label small">Phone</label>
                            <input type="number" class="form-control form-control-sm" name="customer_phone" id="phone" v-model="form.customer_phone" required>
                        </div>
                        <div class="mb-2">
                            <label for="customer_address" class="form-label small">Address</label>
                            <textarea name="customer_address" class="form-control form-control-sm" id="customer_address" cols="10" rows="5" v-model="form.customer_address" required></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="onSaveCustomer()" class="btn btn-sm btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
        </div>


    </div>
</template>