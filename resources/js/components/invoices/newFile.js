import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default (() => {
const __VLS_setup = async () => {
const router = useRouter();

let form = ref([]);
let allCustomers = ref([]);
let allUsers = ref([]);
let user_id = ref([]);
let customer_id = ref([]);
let item = ref([]);
let listCart = ref([]);
let listproducts = ref([]);

let name = localStorage.getItem('name');

const showModel = ref(false);
const hideModel = ref(true);

onMounted(async () => {
indexForm();
getAllCustomers();
getproducts();
getAllUsers();
});

const indexForm = async () => {
let response = await axios.get('/api/create_invoice');
form.value = response.data;
};

const getAllCustomers = async () => {
let response = await axios.get('/api/customers');
allCustomers.value = response.data.customers;
};

const getAllUsers = async () => {
let response = await axios.get('/api/users');
allUsers.value = response.data.users;
};

const addCart = (item) => {
const itemcart = {
id: item.id,
item_code: item.item_code,
description: item.description,
unit_price: item.unit_price,
quantity: item.quantity,
};
listCart.value.push(itemcart);
closeModel();
};

const removeItem = (i) => {
listCart.value.splice(i, 1);
};

const openModel = () => {
showModel.value = !showModel.value;
};
const closeModel = () => {
showModel.value = !hideModel.value;
};

const getproducts = async () => {
let response = await axios.get('/api/products');
listproducts.value = response.data.products;
};

const subTotal = () => {
let total = 0;
listCart.value.map((data) => {
total = total + (data.quantity * data.unit_price);
});
return total;
};
const total = () => {
let subtotal = subTotal();
let discount = form.value.discount;
return subtotal - discount;
};

const onSave = () => {
console.log(listCart.value);
if (listCart.value.length >= 1) {
let subtotal = 0;
subtotal = subTotal();

let grandTotal = 0;
grandTotal = total();

const formData = new FormData();
formData.append('invoice_item', JSON.stringify(listCart.value));
formData.append('customer_id', customer_id.value);
formData.append('date', form.value.date);
formData.append('due_date', form.value.due_date);
formData.append('number', form.value.number);
formData.append('reference', user_id.value);
formData.append('discount', form.value.discount);
formData.append('subtotal', subtotal);
formData.append('total', grandTotal);
formData.append('terms_and_conditions', form.value.terms_and_conditions);

axios.post("/api/add_invoice", formData);
listCart.value = [];
router.push('/invoices');
}
};
const __VLS_publicComponent = (await import('vue')).defineComponent({
setup() {
return {};
},
});

const __VLS_componentsOption = {};

let __VLS_name!: 'new';
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {} &
import('./__VLS_types.js').WithComponent<'RouterLink', typeof __VLS_components, 'RouterLink', 'routerLink', 'router-link'>;
__VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components['router-link']; __VLS_components['router-link'];
// @ts-ignore
[RouterLink, RouterLink,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("container"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("mb-2"), };
{
({} as JSX.IntrinsicElements).h2;
({} as JSX.IntrinsicElements).h2;
(__VLS_x as JSX.IntrinsicElements)['h2'] = {};
}
{
__VLS_templateComponents.RouterLink;
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.RouterLink>) = { to: ("/"), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { class: ("btn btn-sm btn-secondary mx-2"), };
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: (" fas fa-reply"), };
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("bg-white text-dark rounded"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("row px-5 py-3"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md-4"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: (""), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("customers"), };
}
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { name: (""), id: ("customers"), class: ("form-control"), value: ((__VLS_ctx.customer_id)), };
// @ts-ignore
[customer_id,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { disabled: (true), };
}
for (const [customer] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.allCustomers)) {
// @ts-ignore
[allCustomers,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { value: ((customer.id)), key: ((customer.id)), };
(customer.firstname);
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("mt-4"), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { type: ("button"), class: ("btn btn-primary btn-sm"), dataBsToggle: ("modal"), 'data-bs-toggle': ("modal"), dataBsTarget: ("#exampleModal"), 'data-bs-target': ("#exampleModal"), };
type __VLS_0 = JSX.IntrinsicElements['button'];
const __VLS_1: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_0['onClick']> = {
click: $event => {
__VLS_ctx.openModel();
}
};
// @ts-ignore
[openModel,];
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fas fa-cart-plus"), };
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md-4"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: (""), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("date"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { id: ("date"), placeholder: ("dd-mm-yyyy"), type: ("date"), class: ("form-control"), };
(__VLS_ctx.form.date);
// @ts-ignore
[form,];
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("due_date"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { id: ("due_date"), type: ("date"), class: ("form-control"), };
(__VLS_ctx.form.due_date);
// @ts-ignore
[form,];
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md-4"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: (""), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("number"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control"), value: ((__VLS_ctx.form.number)), };
// @ts-ignore
[form,];
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("users"), };
{
({} as JSX.IntrinsicElements).small;
({} as JSX.IntrinsicElements).small;
(__VLS_x as JSX.IntrinsicElements)['small'] = { class: ("fw-bold text-muted "), };
}
}
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { name: ("users"), id: ("users"), class: ("form-control"), value: ((__VLS_ctx.user_id)), };
// @ts-ignore
[user_id,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { selected: (true), };
}
for (const [user] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.allUsers)) {
// @ts-ignore
[allUsers,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { value: ((user.name)), key: ((user.id)), };
(user.name);
}
}
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("number"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control"), value: ((__VLS_ctx.form.user)), };
// @ts-ignore
[form,];
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("mx-5"), };
{
({} as JSX.IntrinsicElements).table;
({} as JSX.IntrinsicElements).table;
(__VLS_x as JSX.IntrinsicElements)['table'] = { class: ("table table-success table-striped"), };
{
({} as JSX.IntrinsicElements).thead;
({} as JSX.IntrinsicElements).thead;
(__VLS_x as JSX.IntrinsicElements)['thead'] = {};
{
({} as JSX.IntrinsicElements).tr;
({} as JSX.IntrinsicElements).tr;
(__VLS_x as JSX.IntrinsicElements)['tr'] = {};
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("col"), };
}
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("col"), };
}
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("col"), };
}
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("col"), };
}
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("col"), };
}
}
}
{
({} as JSX.IntrinsicElements).tbody;
({} as JSX.IntrinsicElements).tbody;
(__VLS_x as JSX.IntrinsicElements)['tbody'] = {};
for (const [itemcart, i] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.listCart)) {
// @ts-ignore
[listCart,];
{
({} as JSX.IntrinsicElements).tr;
({} as JSX.IntrinsicElements).tr;
(__VLS_x as JSX.IntrinsicElements)['tr'] = { key: ((itemcart.id)), };
{
({} as JSX.IntrinsicElements).th;
({} as JSX.IntrinsicElements).th;
(__VLS_x as JSX.IntrinsicElements)['th'] = { scope: ("row"), };
(itemcart.item_code);
(itemcart.description);
}
{
({} as JSX.IntrinsicElements).td;
({} as JSX.IntrinsicElements).td;
(__VLS_x as JSX.IntrinsicElements)['td'] = {};
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control form-control-sm w-50"), value: ((itemcart.unit_price)), };
}
}
{
({} as JSX.IntrinsicElements).td;
({} as JSX.IntrinsicElements).td;
(__VLS_x as JSX.IntrinsicElements)['td'] = {};
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control form-control-sm w-50"), value: ((itemcart.quantity)), };
}
}
if (itemcart.quantity) {
{
({} as JSX.IntrinsicElements).td;
({} as JSX.IntrinsicElements).td;
(__VLS_x as JSX.IntrinsicElements)['td'] = {};
((itemcart.quantity) * (itemcart.unit_price));
}
}
else {
{
({} as JSX.IntrinsicElements).td;
({} as JSX.IntrinsicElements).td;
(__VLS_x as JSX.IntrinsicElements)['td'] = {};
}
}
{
({} as JSX.IntrinsicElements).td;
({} as JSX.IntrinsicElements).td;
(__VLS_x as JSX.IntrinsicElements)['td'] = { class: ("text-danger text-center"), };
type __VLS_2 = JSX.IntrinsicElements['td'];
const __VLS_3: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_2['onClick']> = {
click: $event => {
__VLS_ctx.removeItem(i);
}
};
// @ts-ignore
[removeItem,];
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { class: ("btn btn-sm btn-danger px-2 py-1"), };
}
}
}
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("row px-5 my-2"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md-6"), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { class: ("fw-bold text-muted"), for: ("conditions"), };
}
{
({} as JSX.IntrinsicElements).textarea;
({} as JSX.IntrinsicElements).textarea;
(__VLS_x as JSX.IntrinsicElements)['textarea'] = { id: ("conditions"), cols: ("10"), rows: ("5"), class: ("form-control"), value: ((__VLS_ctx.form.terms_and_conditions)), };
// @ts-ignore
[form,];
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md-6"), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { class: ("fw-bold text-muted"), for: (""), };
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("row g-2"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("form-floating"), };
{
({} as JSX.IntrinsicElements).span;
({} as JSX.IntrinsicElements).span;
(__VLS_x as JSX.IntrinsicElements)['span'] = { class: ("form-control"), id: ("subtotal"), };
(__VLS_ctx.subTotal());
// @ts-ignore
[subTotal,];
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("subtotal"), };
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("form-floating"), };
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("number"), class: ("form-control"), id: ("discount"), };
(__VLS_ctx.form.discount);
// @ts-ignore
[form,];
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("discount"), };
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("row g-2 mt-2"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-md"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("form-floating"), };
{
({} as JSX.IntrinsicElements).span;
({} as JSX.IntrinsicElements).span;
(__VLS_x as JSX.IntrinsicElements)['span'] = { class: ("form-control"), id: ("total"), };
(__VLS_ctx.total());
// @ts-ignore
[total,];
}
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("total"), };
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("text-end my-3"), };
{
({} as JSX.IntrinsicElements).a;
({} as JSX.IntrinsicElements).a;
(__VLS_x as JSX.IntrinsicElements)['a'] = { class: ("btn btn-success btn-sm"), };
type __VLS_4 = JSX.IntrinsicElements['a'];
const __VLS_5: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_4['onClick']> = {
click: $event => {
__VLS_ctx.onSave();
}
};
// @ts-ignore
[onSave,];
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fas fa-save"), };
}
}
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal fade"), id: ("exampleModal"), tabindex: ("-1"), 'aria-labelledby': ("exampleModalLabel"), 'aria-hidden': ("true"), };
({ show: __VLS_ctx.showModel });
// @ts-ignore
[showModel,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal-dialog"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal-content"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal-header"), };
{
({} as JSX.IntrinsicElements).h1;
({} as JSX.IntrinsicElements).h1;
(__VLS_x as JSX.IntrinsicElements)['h1'] = { class: ("modal-title fs-5"), id: ("exampleModalLabel"), };
}
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { type: ("button"), class: ("btn-close"), dataBsDismiss: ("modal"), 'data-bs-dismiss': ("modal"), 'aria-label': ("Close"), };
type __VLS_6 = JSX.IntrinsicElements['button'];
const __VLS_7: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_6['onClick']> = {
click: $event => {
__VLS_ctx.closeModel();
}
};
// @ts-ignore
[closeModel,];
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal-body"), };
{
({} as JSX.IntrinsicElements).ul;
({} as JSX.IntrinsicElements).ul;
(__VLS_x as JSX.IntrinsicElements)['ul'] = {};
for (const [item, i] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.listproducts)) {
// @ts-ignore
[listproducts,];
{
({} as JSX.IntrinsicElements).li;
({} as JSX.IntrinsicElements).li;
(__VLS_x as JSX.IntrinsicElements)['li'] = { key: ((item.id)), 'style="display: grid; gridTemplateColumns: 30px 350px 15px; alignItems: center; paddingBottom: 5px;"': ({}), 'style="display: grid; grid-template-columns: 30px 350px 15px; align-items: center; padding-bottom: 5px;"': ((__VLS_ctx.style = "display: grid; grid-template-columns: 30px 350px 15px; align-items: center; padding-bottom: 5px;")), };
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(i + 1);
}
{
({} as JSX.IntrinsicElements).a;
({} as JSX.IntrinsicElements).a;
(__VLS_x as JSX.IntrinsicElements)['a'] = { href: (""), };
(item.item_code);
(item.description);
}
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { 'style="border:1px solid #e0e0e0; width: 35px; height: 35px; cursor: pointer;"': ({}), dataBsDismiss: ("modal"), 'data-bs-dismiss': ("modal"), };
type __VLS_8 = JSX.IntrinsicElements['button'];
const __VLS_9: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_8['onClick']> = {
click: $event => {
__VLS_ctx.addCart(item);
}
};
// @ts-ignore
[addCart,];
}
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("modal-footer"), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { type: ("button"), class: ("btn btn-secondary"), dataBsDismiss: ("modal"), 'data-bs-dismiss': ("modal"), };
type __VLS_10 = JSX.IntrinsicElements['button'];
const __VLS_11: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_10['onClick']> = {
click: $event => {
__VLS_ctx.closeModel();
}
};
// @ts-ignore
[closeModel,];
}
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { type: ("button"), class: ("btn btn-primary"), };
}
}
}
}
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
form: form,
allCustomers: allCustomers,
allUsers: allUsers,
user_id: user_id,
customer_id: customer_id,
listCart: listCart,
listproducts: listproducts,
showModel: showModel,
addCart: addCart,
removeItem: removeItem,
openModel: openModel,
closeModel: closeModel,
subTotal: subTotal,
total: total,
onSave: onSave,
};
},
});
return {} as typeof __VLS_publicComponent;
};
return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
