<template>
<div class="view-card">
    <div class="view-header">
        <h3 class="view-title">post management</h3>
    </div>
    <div class="view-body">
        <div class="search row">
            <div class="col-sm-4">
                <el-input v-if="!status" v-model="filterForm.searchInput" placeholder="Search Posts" prefix-icon="el-icon-search"> </el-input>
                <el-select v-else v-model="filterForm.satusValue" placeholder="Select">
                    <el-option v-for="item in Statusoptions" :key="item.value" :label="item.label" :value="item.value" :style="item.style">
                    </el-option>
                </el-select>
            </div>
            <div class="col-sm-3">
                <el-select v-model="filterForm.FilterSearch" @change="switchFilter()" placeholder="Search Filter">
                    <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <div class="col-sm-5">
                <el-date-picker v-model="filterForm.dateFilter" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date">
                </el-date-picker>
            </div>
        </div>
        <div class="DataShow">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-table class="table-striped" :data="queriedData" border style="width: 100%">
                            <el-table-column sortable align="center" v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                            </el-table-column>
                            <el-table-column :min-width="200" align="center" label="Category">
                                <template slot-scope="props">
                                    <span>{{props.row.postTopic.category.categoryTitle}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="200" align="center" label="Topic">
                                <template slot-scope="props">
                                    <span>{{props.row.postTopic.topicTitle}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="200" align="center" label="Posted By">
                                <template slot-scope="props">
                                    <span>{{props.row.postOwner.userName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="200" align="center" label="Status">
                                <template slot-scope="props">
                                    <el-select @change="changeStatus(props.row)" v-model="props.row.postSatus" clearable placeholder="Select">
                                        <el-option key="Active" label="Active" value="Active">Active</el-option>
                                        <el-option key="Closed" label="Closed" value="Closed">Closed</el-option>
                                        <el-option key="Archived" label="Archived" value="Archived">Archived</el-option>
                                        <el-option key="Hidden" label="Hidden" value="Hidden">Hidden</el-option>
                                        <el-option style="padding-left: 21px;" key="Pinned" label="Pinned" value="Pinned">Pinned</el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column :min-width="100" align="center" fixed="right" label="Actions">
                                <template slot-scope="props">
                                    <el-popconfirm v-on:onConfirm="handleDelete(props.$index, props.row)" confirm-button-text='OK' cancel-button-text='No, Thanks' icon="el-icon-info" icon-color="red" title="Are you sure to delete this?">
                                        <a slot="reference"><i style="color: rgb(214 90 90); font-size: 23px;cursor: pointer;" class="fa fa-close"></i></a>
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
</div>
</template>

<script>
import PPagination from '@/components/Pagination.vue'
import axiosBase from '@/views/base.js';
export default {
    components: {

    },
    data() {
        return {
            userId: "",
            valid: 0,
            /*Table*/
            pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
            },
            searchQuery: '',
            propsToSearch: ['name', 'email', 'age'],
            tableColumns: [{
                    prop: 'postId',
                    label: 'Id',
                    minWidth: 200
                },
                {
                    prop: 'postTitle',
                    label: 'Title',
                    minWidth: 400
                }
            ],
            tableData: [],

            /*Filters And Search */

            filterForm: {
                searchInput: "",
                FilterSearch: "",
                dateFilter: "",
                satusValue: ""
            },
            status: false,
            Statusoptions: [{
                value: '1',
                label: 'Active'
            }, {
                value: '2',
                label: 'Closed'
            }, {
                value: '3',
                label: 'Archived'
            }, {
                value: '4',
                label: 'Hidden',
                style: "padding-left: 21px;"
            }],
            options: [{
                label: 'By Post',
                options: [{
                        value: 'id',
                        label: 'Identifier'
                    },
                    {
                        value: 'title',
                        label: 'Title'
                    },
                    {
                        value: 'status',
                        label: 'status'
                    }
                ]
            }, {
                label: 'By User',
                options: [{
                    value: 'userName',
                    label: 'Username'
                }, {
                    value: 'userMail',
                    label: 'User EMail'
                }]
            }],
        }

    },
    components: {
        PPagination
    },
    created() {
        if (sessionStorage.getItem("user"))
            this.userId = sessionStorage.getItem("user")
        else if (localStorage.getItem("user"))
            this.userId = localStorage.getItem("user")
        else {
            this.valid++
        }
        if (this.valid > 0) {
            this.$router.push("/login")
            return
        }
        axiosBase.get("/posts/all")
            .then((response) => {
                this.tableData = response.data
            })
            .catch((error) => {

            })
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
        switchFilter() {
            if (this.filterForm.FilterSearch === "status") {
                this.status = true
            } else
                this.status = false
        },
        changeStatus(obj) {
            axiosBase.post("/posts/change/status", obj)
                .then((response) => {
                })
                .catch((error) => {

                })
        },
        handleDelete(index, row) {
            axiosBase.delete("posts/permanent/" + row.postId + "/" + this.userId)
                .then((response) => {
                    let indexToDelete = self.tableData.findIndex((tableRow) => tableRow.id === row.id)
                    if (indexToDelete >= 0) {
                        self.tableData.splice(indexToDelete, 1)
                    }
                    self.$notify({
                        title: 'Success',
                        message: 'Post deleted successfully',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    this.$notify.error({
                        title: 'Error',
                        message: error,
                    });
                })
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
</style>
