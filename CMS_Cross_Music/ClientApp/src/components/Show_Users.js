import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Show_Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [], wydzialy: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "single"
        };

        this.getPoziomDostepu = this.getPoziomDostepu.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    async componentDidMount() {
        await fetch('api/Usrs')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
        this.getTableData();
    }

    refresh() {
        this.props.history.push("/users");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var users = this.state.users;
        var user_rowData = [];
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var row = {
                id: user.idUser,
                name: user.userName,
                email: user.userEmail,
                rank: this.getPoziomDostepu(user.userRank),
                status: user.userStatus
            }

            user_rowData.push(row);
        }
        return user_rowData;
    }

    getPoziomDostepu(lvl) {
        let res;
        switch (lvl) {
            case 1:
                res = "Guest";
                break;
            case 2:
                res = "Member";
                break;
            case 3:
                res = "Admin";
                break;
            default:
                res = "Not Found";
        }
        return res;
    }

    setColumns() {
        let cols = [
            {
                headerName: "Id", field: "id", sortable: true, filter: true
            },
            {
                headerName: "UserName", field: "name", sortable: true, filter: true
            },
            {
                headerName: "Email", field: "email", sortable: true, filter: true,
            },
            {
                headerName: "Rank", field: "rank", sortable: true, filter: true
            },
            {
                headerName: "Status", field: "status", sortable: true, filter: true
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    handleRedirect(cell) {

        //alert(cell);
        this.props.history.push('/edit_user/' + cell);
    }

    handleCreate() {
        this.props.history.push('/edit_user/0');
    }

    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/edit_user/' + selectedRow.id);

    }

    render() {
        return (
            <div style={{ height: '500px' }} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    context={this.state.context}
                    onGridReady={this.onGridReady}
                    rowSelection={this.state.rowSelection}
                    onSelectionChanged={this.onSelectionChanged.bind(this)}
                />
                <FormGroup>
                    <Button className="btn btn-primary" type="button" onClick={this.handleCreate}>Create new</Button>
                </FormGroup>
            </div>
        );
    }
}


export default connect()(Show_Users);
