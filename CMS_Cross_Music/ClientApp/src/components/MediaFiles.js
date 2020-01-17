import React, { Component } from 'react';
import { connect } from 'react-redux';
import "video-react/dist/video-react.css";
import Show_Video from './Show_Video';
import { Table } from 'reactstrap';
import ReactPlayer from 'react-player';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import FilePoPUp from './FilePopUp';

class MediaFiles extends Component {


    constructor(props) {
        super(props);
        this.state = {
            files: [],
            loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "single",
            open: false,
            chosen_id: 0,
            chosen_link: ""
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.togglePopUp = this.togglePopUp.bind(this);
        //this.handleCreate = this.handleCreate.bind(this);

    }

    async componentDidMount() {
        const user_id = this.props.match.params.id;
        let req = 'api/Mediafiles?$expand=userIdUserNavigation';
        if (user_id) {
            let filter = '&$filter= UserIdUser eq ' + user_id;
            req += filter;
            let req_url = 'api/usrs?$filter=IdUser eq ' + user_id;
            fetch(req_url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        user: data[0], loading: false
                    });
                });
        }
        await fetch(req)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    files: data
                });
            });
        this.getTableData();
    }

    refresh() {
        this.props.history.push("/mediafiles");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var files = this.state.files;
        var file_rowData = [];
        for (var i = 0; i < files.length; i++) {
            var fl = files[i];
            var row = {
                IdFile: fl.IdFile,
                MediaName: fl.MediaName,
                MediaType: fl.MediaType,
                Author: fl.UserIdUserNavigation.UserName,
                FlLink: fl.FlLink
            }

            file_rowData.push(row);
        }
        return file_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "Id", field: "IdFile", sortable: true, filter: true
            },
            {
                headerName: "MediaName", field: "MediaName", sortable: true, filter: true
            },
            {
                headerName: "MediaType", field: "MediaType", sortable: true, filter: true,
            },
            {
                headerName: "Author", field: "Author", sortable: true, filter: true
            },
            {
                headerName: "FlLink", field: "FlLink", sortable: true, hidden: true
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    togglePopUp() {
        let o = this.state.open;
        console.log(o);
        this.setState({ open: false });
    }

    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.setState({ open: true, chosen_id: selectedRow.IdFile, chosen_link: selectedRow.FlLink });
    }

    render() {
        return (
            <div>
                {this.state.user &&
                    <h3>Biblioteka uzytkownika {this.state.user.userName} </h3>
                }
                <div style={{ height: '500px' }} className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        context={this.state.context}
                        onGridReady={this.onGridReady}
                        rowSelection={this.state.rowSelection}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                    />
                </div>
                <FilePoPUp isopen={this.state.open} chosen={this.state.chosen_id} hide={this.togglePopUp} chosen_link={this.state.chosen_link} />
            </div>
        );
    }
}



export default connect()(MediaFiles);