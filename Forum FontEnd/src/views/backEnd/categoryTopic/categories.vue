<template>
<div class="view-card">
    <div class="view-header">
        <h3 class="view-title">categories Management</h3>
    </div>
    <div class="view-body">
        <div class="search row">
            <div class="col-sm-4">
                <el-input v-model="searchQuery" placeholder="Search Posts" prefix-icon="el-icon-search"> </el-input>
            </div>
            <div class="col-sm-3">
                <el-select v-model="findBy" @change="switchFilter" placeholder="Select">
                    <el-option v-for="item in Searchoptions" :key="item.value" :label="item.label" :value="item.value" :style="item.style">
                    </el-option>
                </el-select>
            </div>
            <div class="col-sm-5 btn-zone ">
                <el-button type="primary" icon="el-icon-plus" @click="categoryFormDialog = true"> Add Category</el-button>
            </div>
        </div>
        <div class="DataShow">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-table class="table-striped" :data="queriedData" border style="width: 100%">
                            <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" align="center" :label="column.label">
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" fixed="right" label="Logo">
                                <template slot-scope="props">
                                    <a style=" cursor: pointer;" v-if="props.row.categoryLogo !=null"><i class="el-icon-picture-outline-round" @click="openImg(props.row.categoryLogo)"></i></a>
                                    <a v-else><i class="el-icon-close"></i></a>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" fixed="right" label="Cover">
                                <template slot-scope="props">
                                    <a style=" cursor: pointer;" v-if="props.row.categoryLogo !=null"><i class="el-icon-picture-outline" @click="openImg(props.row.categoryImage)"></i></a>
                                    <a v-else><i class="el-icon-close"></i></a>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" fixed="right" label="Actions">
                                <template slot-scope="props">
                                    <a @click="handleEdit(props.$index, props.row)"><i style="margin-right: 11px;color: orange;" class="el-icon-edit"></i></a>
                                    <el-popconfirm v-on:onConfirm="handleDelete(props.$index, props.row)" confirm-button-text='OK' cancel-button-text='No, Thanks' icon="el-icon-info" icon-color="red" title="Are you sure to delete this?">
                                        <a slot="reference"><i style="color: #df4141;" class="fa fa-close"></i></a>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                            <div class="no-data-found" slot="append" v-if="tableData.length=='0'">
                                No Data Found
                            </div>
                        </el-table>
                    </div>
                </div>
                </br>
                <div class="row">
                    <div class="col-sm-6 pagination-info">
                        <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
                    </div>
                    <div class="col-sm-6">
                        <p-pagination class="pull-right" v-model="pagination.currentPage" :per-page="pagination.perPage" :total="pagination.total">
                        </p-pagination>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <el-dialog title="Add new Category" :visible.sync="categoryFormDialog" width="50%">
        <el-form :model="categoryForm" :rules="categoryFormRules" ref="categoryForm">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">Category Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="categoryTitle">
                            <el-input v-model="categoryForm.categoryTitle"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Category Description</div>
                    <div class="col-sm-8">
                        <el-form-item prop="categoryDescription">
                            <el-input type="textarea" v-model="categoryForm.categoryDescription"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="text-align:center">
                    <div class="upload-btn-wrapper" style="margin-right: 5%;margin-top: 3%;">
                        <a class="btn">Topic Logo <i class="el-icon-upload upload-ico"></i></a>
                        <input type="file" ref="logo" name="logo" @change="onFileLogo" />
                        <br>
                        <span>{{selectedlogo.name}}</span>
                    </div>
                    <div class="upload-btn-wrapper">
                        <a class="btn">Topic Cover <i class="el-icon-upload upload-ico"></i></a>
                        <input type="file" ref="cover" name="cover" @change="onFileCover" />
                        <br>
                        <span>{{selectedcover.name}}</span>
                    </div>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="categoryFormDialog = false">Cancel</el-button>
            <el-button type="primary" @click="submitCategoryForm('categoryForm')">Add Category</el-button>
        </span>
    </el-dialog>
    <el-dialog title="Edit Category" :visible.sync="editFormDialog" width="50%">
        <el-form :model="selectedForm" :rules="categoryFormRules" ref="selectedForm">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">Category Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="categoryTitle">
                            <el-input v-model="selectedForm.categoryTitle"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Category Description</div>
                    <div class="col-sm-8">
                        <el-form-item prop="categoryDescription">
                            <el-input type="textarea" v-model="selectedForm.categoryDescription"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="text-align:center">
                    <div class="upload-btn-wrapper" style="margin-right: 5%;margin-top: 3%;">
                        <a class="btn">Topic Logo <i class="el-icon-upload upload-ico"></i></a>
                        <input type="file" ref="logo" name="logo" @change="onFileLogo" />
                        <br>
                        <span>{{selectedlogo.name}}</span>
                    </div>
                    <div class="upload-btn-wrapper">
                        <a class="btn">Topic Cover <i class="el-icon-upload upload-ico"></i></a>
                        <input type="file" ref="cover" name="cover" @change="onFileCover" />
                        <br>
                        <span>{{selectedcover.name}}</span>
                    </div>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editFormDialog=false">Cancel</el-button>
            <el-button type="primary" @click="submitCategoryForm('selectedForm')">Confirm Editing</el-button>
        </span>
    </el-dialog>
    <el-dialog :visible.sync="imageDialog">
        <img width="100%" :src="selectedImg" alt="">
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import '@/assets/css/pagesStyle.css'
import PPagination from '@/components/Pagination.vue'
import axiosBase from '../../base'
export default {
    components: {},
    created() {
        this.imgPath = this.$basePath + "/categoryImg"
        let self = this
        axiosBase.get("Categories/all").then((response) => {
                this.tableData = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    data() {
        return {
            /*Main Data*/
            selectedlogo: "",
            selectedcover: "",
            selectedImg: "",
            imgPath: "",
            selectedForm: {
                id: "",
                categoryId: "",
                categoryTitle: "",
                categoryDescription: "",
                categoryLogo: "",
                categoryImage: "",
            },
            tabIndex: 0,
            categoryForm: {
                categoryTitle: "",
                categoryDescription: ""
            },
            categoryFormRules: {
                categoryTitle: [{
                    required: true,
                    message: 'Please input category title',
                    trigger: 'blur'
                }, ],
                categoryDescription: [{
                    required: true,
                    message: 'Please input category description',
                    trigger: 'blur'
                }, ]
            },
            categoryFormDialog: false,
            editFormDialog: false,
            imageDialog: false,
            /*Table*/

            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
            },
            searchQuery: '',
            propsToSearch: ['categoryId', 'categoryTitle'],
            tableColumns: [{
                    prop: 'categoryId',
                    label: 'Id',
                    minWidth: 200,
                    align: "center"
                },
                {
                    prop: 'categoryTitle',
                    label: 'Title',
                    minWidth: 250,
                    align: "center"
                },
                {
                    prop: 'categoryDescription',
                    label: 'Description',
                    minWidth: 250,
                    align: "center"
                }
            ],
            tableData: [],

            /*Filters And Search */
            Searchoptions: [{
                    value: '0',
                    label: 'By All'
                },
                {
                    value: '1',
                    label: 'By Id'
                }, {
                    value: '2',
                    label: 'By Title',
                    style: "padding-left: 21px;"
                }
            ],
            findBy: '0',
        }

    },
    components: {
        PPagination
    },
    computed: {
        pagedData() {
            return this.tableData.slice(this.from, this.to)
        },
        queriedData() {
            if (!this.searchQuery) {
                this.pagination.total = this.tableData.length
                return this.pagedData
            }
            let result = this.tableData
                .filter((row) => {
                    let isIncluded = false
                    for (let key of this.propsToSearch) {
                        let rowValue = row[key].toString()
                        if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                            isIncluded = true
                        }
                    }
                    return isIncluded
                })
            this.pagination.total = result.length
            return result.slice(this.from, this.to)
        },
        to() {
            let highBound = this.from + this.pagination.perPage
            if (this.total < highBound) {
                highBound = this.total
            }
            return highBound
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1)
        },
        total() {
            this.pagination.total = this.tableData.length
            return this.tableData.length
        }
    },
    methods: {

        openImg(img) {
            var images = require.context('../../../assets/img/categoryImg/')
            this.selectedImg = images('./' + img)
            this.imageDialog = true
        },
        onFileLogo(event) {
            this.selectedlogo = event.target.files[0];
        },
        onFileCover(event) {
            this.selectedcover = event.target.files[0];
        },
        submitCategoryForm(formName) {
            if (formName == "selectedForm") {
                this.categoryForm = this.selectedForm
            }
            this.$refs[formName].validate((valid) => {

                if (valid) {
                    let df = new FormData();
                    if (this.selectedlogo !== null && this.selectedcover != null) {
                        df.append("file", this.selectedlogo)
                        df.append("file", this.selectedcover)
                    }
                    df.append("path", this.imgPath)
                    df.append("category", JSON.stringify(this.categoryForm))
                    axiosBase.post("Categories/img", df)
                        .then((response) => {
                            let data = response.data
                            if (formName != "selectedForm") {
                                this.tableData.push(data)

                                this.$notify({
                                    title: 'Success',
                                    message: 'Category added successfully',
                                    type: 'success'
                                });
                            } else {
                                this.tableData[this.tabIndex]["id"] = data.id
                                this.tableData[this.tabIndex]["categoryId"] = data.categoryId
                                this.tableData[this.tabIndex]["categoryTitle"] = data.categoryTitle
                                this.tableData[this.tabIndex]["categoryDescription"] = data.categoryDescription
                                this.tableData[this.tabIndex]["categoryLogo"] = data.categoryLogo
                                this.tableData[this.tabIndex]["categoryImage"] = data.categoryImage
                                this.$notify({
                                    title: 'Success',
                                    message: 'Category Edited successfully',
                                    type: 'success'
                                });
                            }
                            this.categoryFormDialog = false
                            this.editFormDialog = false
                        })
                        .catch((error) => {
                            this.$notify.error({
                                title: 'Error',
                                message: 'An error was produced while add this category',
                            });
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleEdit(index, row) {
            this.tabIndex = index
            this.selectedForm.id = row.id
            this.selectedForm.categoryId = row.categoryId
            this.selectedForm.categoryTitle = row.categoryTitle
            this.selectedForm.categoryDescription = row.categoryDescription
            this.selectedForm.categoryLogo = row.categoryLogo
            this.selectedForm.categoryImage = row.categoryImage
            this.editFormDialog = true
        },
        handleDelete(index, row) {
            let self = this
            axiosBase.delete("Categories/permanent/" + row.categoryId)
                .then((response) => {
                    let indexToDelete = self.tableData.findIndex((tableRow) => tableRow.id === row.id)
                    if (indexToDelete >= 0) {
                        self.tableData.splice(indexToDelete, 1)
                    }
                    self.$notify({
                        title: 'Success',
                        message: 'Category deleted successfully',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    this.$notify.error({
                        title: 'Error',
                        message: error,
                    });
                })

        },
        switchFilter() {
            if (this.findBy == "0")
                this.propsToSearch = ['categoryId', 'categoryTitle']
            else if (this.findBy == "1")
                this.propsToSearch = ['categoryId']
            else
                this.propsToSearch = ['categoryTitle']
        }
    }
}
</script>

<style>

</style>
