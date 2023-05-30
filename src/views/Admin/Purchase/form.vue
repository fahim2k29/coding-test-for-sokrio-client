<template>
    <div id="purchase">
        <h2 style="widows: 150px"> This is a Products related information </h2>
        <div class="card">
            <div class="row card-header bg-transparent border-bottom">
                <div class="col-md-12">
                    <h1 class="card-title">Product Purchase</h1>
                </div>
            </div>

            <div class="card-body">
                <form @submit.prevent="store()" enctype="multipart/form-data">
                    <AlertError :form="form" message="There were some problems with your input." />
                    <div class="modal-body row">
                        <div class="">
                            <div class="form-group my-2 ">
                                <label>Invoice No.</label>
                                <input v-model="form.invoice_no" type="text" name="invoice_no" class="form-control" placeholder="Invoice No.">
                                <HasError :form="form" field="invoice_no" />
                            </div>
                            <div class="card">
                                <div class="card-header">Add Product with the Code/ Name</div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="search">
                                            <input type="text" class="form-control" aria-label="Search" v-model="searchQuery" placeholder="Search by Code or Name">
                                        </div>
                                        <div class="searched-products">
                                            <h2>Search Results</h2>
                                            <ul>
                                                <li v-for="product in products" :key="product.id">
                                                    {{ product.code }} - {{ product.name }}
                                                    <button type="button" @click="addProductToList(product)" class="btn btn-success btn-sm">+</button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div v-if="form.product_detail_inputs.length > 0" class="selected-products">
                                            <h4>Selected Products</h4>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>P.Name</th>
                                                    <th>Stock</th>
                                                    <th>Quantity</th>
                                                    <th>Unit</th>
                                                    <th>Price(৳)</th>
                                                    <th>Total Price(৳)</th>
                                                    <th>X</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(product, index) in form.product_detail_inputs" :key="product.id">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ product.name }}</td>
                                                    <td>{{ product.quantity }}</td>
                                                    <td>
                                                        <input class="text-center" type="number" :name="'addStocks['+index+'][purchase_quantity]'"  v-model="product.purchase_quantity" required>
                                                    </td>
                                                    <td>{{ product.unit }}</td>
                                                    <td>{{ product.price }}</td>
                                                    <td>{{product.quantity * product.price}}</td>
                                                    <td><button type="button" class="btn btn-danger btn-sm" @click="removeAddStocks(index)">X</button></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5"></td>
                                                    <td>Total(৳)</td>
                                                    <td>120</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group my-2 ">
                                <label>Remarks</label>
                                <input v-model="form.remarks" type="text" name="remarks" class="form-control" placeholder="Remarks">
                                <HasError :form="form" field="remarks" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="display: contents;">
                        <button  type="submit" class="btn btn-primary"> Create </button>
                    </div>
                </form>

            </div>
        </div>

        <notifications />

    </div>
</template>

<script>
    import axios from 'axios';
    import Form from "vform";
    export default {
        name: 'form',
        data() {
            return {
                products: [],
                searchQuery: '',
                selectedProducts: [],
                form: new Form({
                    id: '',
                    invoice_no: '',
                    remarks: '',
                    product_detail_inputs:[],
                }),
            };
        },
        watch: {
            searchQuery: function () {
                this.getProducts();
            },
        },

        mounted() {
            this.getProducts();
        },
        methods: {
            getProducts(){
                axios.get(`http://127.0.0.1:8000/api/product/search`,{
                    params: {
                        searchQuery: this.searchQuery
                    },
                })
                    .then((response) => {
                        console.log(response.data.data)
                        this.products = response.data.data.slice(Math.max(response.data.data.length - 10, 0));
                    }).catch((e) => {
                    console.log(e);
                });
            },

            addProductToList(product) {
                this.form.product_detail_inputs.push({
                    id:product.id,
                    name:product.name,
                    code:product.code,
                    quantity:product.quantity,
                    price:product.price,
                    unit:product.unit,
                    purchase_quantity:'',
                })
                // Add the selected product to the selectedProducts list
                console.log(this.form.product_detail_inputs,product)
                // this.selectedProducts.push(product);
            },

            removeAddStocks(index){
                this.form.product_detail_inputs.splice(index,1);
            },

            store(){
                this.form.post(`http://127.0.0.1:8000/api/purchase-detail`)
                    .then((response) => {
                        if (this.form.successful) {
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Product Purchased Successfully",
                            });
                        } else {
                            this.$notify({
                                type: "error",
                                title: "Error",
                                text: "Something went wrong try again later",
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
    };
</script>

