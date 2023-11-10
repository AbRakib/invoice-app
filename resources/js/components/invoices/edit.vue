<script setup>
    import axios from "axios";
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter()

    let form = ref({
        id:''
    })
    let allCustomers = ref([])
    let customer_id = ref([])
    let listproducts = ref([])

    const showModel = ref(false)
    const hideModel = ref(true)

    const openModel = () => {
        showModel.value = !showModel.value
    }
    const closeModel = () => {
        showModel.value = !hideModel.value
    }

    const addCart = (item) => {
        const itemcart = {
            product_id: item.id,
            item_code : item.item_code,
            description: item.description,
            unit_price: item.unit_price,
            quantity : item.quantity,
        }
        form.value.invoice_items.push(itemcart)
        closeModel()
    }

    const props = defineProps({
        id:{
            type:String,
            default:''
        }
    })

    onMounted(async () => {
        getInvoice()
        getAllCustomers()
        getproducts()
    })

    const getInvoice = async () => {
        let response = await axios.get(`/api/edit_invoice/${props.id}`)
        form.value = response.data.invoice
    }
    const getAllCustomers = async () => {
        let response = await axios.get('/api/customers')
        allCustomers.value = response.data.customers
    }
    const deleteInvoiceItem = (id, i) => {
        form.value.invoice_items.splice(i,1)
        if (id != undefined) {
            axios.get('/api/delete_invoice_items/'+id)
        }
    }
    const getproducts = async () => {
        let response = await axios.get('/api/products')
        listproducts.value = response.data.products
    }
    const subTotal = () => {
        let total = 0
        if (form.value.invoice_items) {
            form.value.invoice_items.map((data) => {
                total = total + (data.quantity * data.unit_price)
            })
        }
        return total
    }
    const total = () => {
        if (form.value.invoice_items) {
            let subtotal = subTotal()
            let discount = form.value.discount
            return subtotal-discount;
        }
    }
    const onEdit = (id) => {
        if(form.value.invoice_items.length >= 1){
            let subtotal = 0
            subtotal = subTotal()

            let grandTotal = 0
            grandTotal = total()

            const formData = new FormData()
            formData.append('invoice_item',JSON.stringify(form.value.invoice_items))
            formData.append('customer_id', form.value.customer_id)
            formData.append('date', form.value.date)
            formData.append('due_date', form.value.due_date)
            formData.append('number', form.value.number)
            formData.append('reference', form.value.reference)
            formData.append('discount', form.value.discount)
            formData.append('subtotal', subtotal)
            formData.append('total', grandTotal)
            formData.append('terms_and_conditions', form.value.terms_and_conditions)

            axios.post(`/api/update_invoice/${form.value.id}`, formData)
            form.value.invoice_items = []
            router.push('/')
        }
    }

</script>

<template>
    <div class="container">
        <div class="mb-2">
            <h2>Edit Invoice</h2>
            <router-link to="/">
                <button class="btn btn-sm btn-secondary mx-2">
                    <i class=" fas fa-reply"></i>
                    Back
                </button>
            </router-link>
        </div>
        <div class="bg-white text-dark rounded">
            <div class="row px-5 py-3">
                <div class="col-md-4">
                    <div class="">
                        <label for="customer">Customer</label>
                        <select name="" id="customer" class="form-control" v-model="form.customer_id">
                            <option disabled>Select Customer</option>
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
                        <label for="date">Date</label> 
                        <input id="date" placeholder="dd-mm-yyyy" type="datetime-local" class="form-control" v-model="form.date"> <!---->
                        <label for="due_date">Due Date</label> 
                        <input id="due_date" type="date" class="form-control" v-model="form.due_date">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="">
                        <label for="number">Numero</label> 
                        <input id="number" type="text" class="form-control" v-model="form.number"> 
                        <label for="reference">Reference(Optional)</label> 
                        <input id="reference" type="text" class="form-control" v-model="form.reference">
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
                        <tr v-for="(itemcart,i) in form.invoice_items" :key="itemcart.id">
                            <td v-if="itemcart.product">
                                #{{ itemcart.product.item_code }} {{ itemcart.product.description }}
                            </td>
                            <td v-else>
                                #{{ itemcart.item_code }} {{ itemcart.description }}
                            </td>
                            <td>
                                <input type="text" class="form-control w-50" v-model="itemcart.unit_price">
                            </td>
                            <td>
                                <input type="text" class="form-control w-50" v-model="itemcart.quantity">
                            </td>
                            <td>
                                $ {{ itemcart.quantity * itemcart.unit_price }}
                            </td>
                            <td>
                                <button class="text-danger btn btn-sm" type="button" @click="deleteInvoiceItem(itemcart.id, i)">&times;</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row px-5 my-2">
                <div class="col-md-6">
                    <label class="fw-bold text-muted" for="conditions">Terms and Conditions</label>
                    <textarea id="conditions" cols="50" rows="5" class="form-control" v-model="form.terms_and_conditions"></textarea>
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
                                <input type="number" class="form-control" id="discount" v-model="form.discount">
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
                    <div class="text-end my-2">
                        <a class="btn btn-success btn-sm" @click="onEdit()"><i class="fas fa-window-restore"></i> Update</a>
                    </div>
                </div>
            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" :class="{show: showModel}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModel()"></button>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li v-for="(item, i) in listproducts" :key="item.id" style="display: grid; grid-template-columns: 30px 350px 15px; align-items: center; padding-bottom: 5px;">
                                <p>{{ i+1 }}</p>
                                <a href="">{{ item.item_code }} {{ item.description }}</a>
                                <button @click="addCart(item)" style="border:1px solid #e0e0e0; width: 35px; height: 35px; cursor: pointer;" data-bs-dismiss="modal">+</button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModel()">Close</button>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>