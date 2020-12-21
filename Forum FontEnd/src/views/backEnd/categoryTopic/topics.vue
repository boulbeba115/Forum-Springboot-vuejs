<template>
<div class="view-card">
    <div class="view-header">
        <h3 class="view-title">Topics Management</h3>
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
                <el-button type="primary" icon="el-icon-plus" @click="topicFormDialog = true"> Add Topic</el-button>
            </div>
        </div>
        <div class="DataShow">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-table class="table-striped" :data="queriedData" border style="width: 100%">
                            <el-table-column sortable align="center" v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" label="Logo">
                                <template slot-scope="props">
                                    <a style=" cursor: pointer;" v-if="props.row.topicLogo !=null"><i class="el-icon-picture-outline-round" @click="openImg(props.row.topicLogo)"></i></a>
                                    <a v-else><i class="el-icon-close"></i></a>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" label="Cover">
                                <template slot-scope="props">
                                    <a style=" cursor: pointer;" v-if="props.row.topicImage !=null"><i class="el-icon-picture-outline" @click="openImg(props.row.topicImage)"></i></a>
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
    <el-dialog title="Add Topic" :visible.sync="topicFormDialog" width="50%">
        <el-form :model="topicForm" :rules="topicFormRules" ref="topicForm">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">Topic Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="topicTitle">
                            <el-input v-model="topicForm.topicTitle"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Topic Description</div>
                    <div class="col-sm-8">
                        <el-form-item prop="topicDescription">
                            <el-input type="textarea" v-model="topicForm.topicDescription"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Topic Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="category">
                            <el-select v-model="topicForm.category.categoryId" placeholder="Select">
                                <el-option v-for="item in categoryOptions" :key="item.categoryId" :label="item.categoryTitle" :value="item.categoryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <span style="margin:10px;text-align: tcenter;display: block;text-align: center;">Insert 2 images : The first will be considered as Logo and the secend as cover</span>
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
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="topicFormDialog = false">Cancel</el-button>
            <el-button type="primary" @click="submitTopicForm('topicForm')">Add Topic</el-button>
        </span>
    </el-dialog>
    <el-dialog title="Edit Category" :visible.sync="editFormDialog" width="50%">
        <el-form :model="selectedForm" :rules="topicFormRules" ref="selectedForm">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">Topic Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="topicTitle">
                            <el-input v-model="selectedForm.topicTitle"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Topic Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="topicDescription">
                            <el-input type="textarea" v-model="selectedForm.topicDescription"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">Topic Title</div>
                    <div class="col-sm-8">
                        <el-form-item prop="category">
                            <el-select v-model="selectedForm.category.categoryId" placeholder="Select">
                                <el-option v-for="item in categoryOptions" :key="item.categoryId" :label="item.categoryTitle" :value="item.categoryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <span style="margin:10px;text-align: tcenter;display: block;text-align: center;">Insert 2 images : The first will be considered as Logo and the secend as cover</span>
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
            <el-button type="primary" @click="submitTopicForm('selectedForm')">Confirm Editing</el-button>
        </span>
    </el-dialog>
    <el-dialog :visible.sync="imageDialog">
        <img width="100%" :src="selectedImg" alt="">
    </el-dialog>
</div>
</template>

<script>
import PPagination from '@/components/Pagination.vue'
import '@/assets/css/pagesStyle.css'
import axiosBase from '../../base'

export default {
    components: {

    },
    data() {
        return {
            /*Main Data*/
            selectedImg: "",
            selectedlogo: "",
            selectedcover: "",
            selectedImg: "",
            imgPath: "",
            selectedForm: {
                id: "",
                topicId: "",
                category: {
                    categoryId: ""
                },
                topicTitle: "",
                topicImage: "",
                topicLogo: "",
                topicDescription: ""
            },
            topicForm: {
                topicTitle: "",
                topicDescription: "",
                category: {
                    categoryId: ""
                }
            },
            topicFormRules: {
                topicTitle: [{
                    required: true,
                    message: 'Please input Topic Title',
                    trigger: 'blur'
                }, ],
                topicDescription: [{
                    required: true,
                    message: 'Please input Activity Description',
                    trigger: 'blur'
                }, ],
                category: [{
                    required: true,
                    message: 'Please select a category',
                    trigger: 'change'
                }]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            topicFormDialog: false,
            editFormDialog:false,
            imageDialog: false,
            tabIndex: 0,
            /*Table*/

            pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
            },
            searchQuery: '',
            propsToSearch: ['topicId', 'topicTitle'],
            tableColumns: [{
                    prop: 'topicId',
                    label: 'ID',
                    minWidth: 100
                },
                {
                    prop: 'topicTitle',
                    label: 'Topic Title',
                    minWidth: 250
                },
                {
                    prop: 'topicDescription',
                    label: 'Topic Description',
                    minWidth: 250
                },
                {
                    prop: 'category.categoryTitle',
                    label: 'Category',
                    minWidth: 250
                },

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
            categoryOptions: [],
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
    created() {
        this.imgPath = this.$basePath + "/TopicImg"
        let self = this
        axiosBase.get("topics/simple/all").then((response) => {
                self.tableData = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        axiosBase.get("Categories/simple/all").then((response) => {
                self.categoryOptions = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {

        openImg(img) {
            var images = require.context('../../../assets/img/TopicImg/')
            this.selectedImg = images('./' + img)
            this.imageDialog = true
        },
        onFileLogo(event) {
            this.selectedlogo = event.target.files[0];
        },
        onFileCover(event) {
            this.selectedcover = event.target.files[0];
        },
        submitTopicForm(formName) {
            if (formName == "selectedForm") {
                this.topicForm = this.selectedForm
                //this.topicForm.category.categoryId=this.selectedForm.
            }
            this.$refs[formName].validate((valid) => {

                if (valid) {
                    let df = new FormData();
                    if (this.selectedlogo !== null && this.selectedcover != null) {
                        df.append("file", this.selectedlogo)
                        df.append("file", this.selectedcover)
                    }
                    df.append("path", this.imgPath)
                    df.append("topic", JSON.stringify(this.topicForm))
                    axiosBase.post("topics/img", df)
                        .then((response) => {
                            let data = response.data
                            if (formName != "selectedForm") {
                                data.category=data.categorydto
                                this.tableData.push(data)
                                this.topicForm= {
                                    topicTitle: "",
                                    topicDescription: "",
                                    category: {
                                        categoryId: ""
                                    }
                                }
                                this.selectedlogo=""
                                this.selectedcover=""
                                this.$notify({
                                    title: 'Success',
                                    message: 'Category added successfully',
                                    type: 'success'
                                });
                            } else {
                                this.tableData[this.tabIndex]["id"] = data.id
                                this.tableData[this.tabIndex]["topicId"] = data.topicId
                                this.tableData[this.tabIndex]["topicTitle"] = data.topicTitle
                                this.tableData[this.tabIndex]["topicDescription"] = data.topicDescription
                                this.tableData[this.tabIndex]["category"] = data.categorydto
                                this.tableData[this.tabIndex]["topicLogo"] = data.topicLogo
                                this.tableData[this.tabIndex]["topicImage"] = data.topicImage
                                this.$notify({
                                    title: 'Success',
                                    message: 'Topic Edited successfully',
                                    type: 'success'
                                });
                            }
                            this.topicFormDialog = false
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
            this.selectedForm.topicId = row.topicId
            this.selectedForm.topicTitle = row.topicTitle
            this.selectedForm.topicDescription = row.topicDescription
            this.selectedForm.category.categoryId = row.category.categoryId
            this.selectedForm.topicLogo = row.topicLogo
            this.selectedForm.topicImage = row.topicImage
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
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300&display=swap');

.view-card {
    background: white;
    border-radius: 10px;
    margin: 1% 0;
    box-shadow: 0 6px 21px rgba(0, 0, 0, 0.22);
}

.view-header {
    width: 100%;
    height: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #7f8c8d;

}

.view-title {
    font-family: 'Titillium Web', sans-serif;
    text-align: center;
    text-transform: capitalize;
    color: white;
    position: relative;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
}

.view-body {
    min-height: 100px;
    margin: 2% 0;
}

.search {
    margin: 10px;
}

.el-select {
    width: 100%;
}

.el-date-editor .el-range-separator {
    padding: 0 !important;
    color: gray !important;
}

.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.is-active {
    max-width: 100%;
}

.row {
    max-width: 100% !important;
}

.page-link {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    line-height: 1.25;
    color: gray;
    background-color: none;
    border: none;
}

.page-item.active .page-link {
    color: #2980b9 !important;
    background-color: transparent !important;
    border-color: none !important;
    font-weight: 800;
}

.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
    width: 100% !important;
}

.btn-zone {
    text-align: right;
    padding-right: 3%;
}
</style>
