import React from 'react';

import SearchBox from './components/SearchBox';
import Grid from "@material-ui/core/Grid";
import List from "./components/List";
import { getLSData, setLSData } from '../utils';
import Footer from './components/Footer';
import Header from "./components/Header";
import { withStyles } from '@material-ui/core';
import {isEmpty, filter as fill} from "lodash";

const styles = theme => ({
  root: {
    background: "#f2f2f2",
    padding: 15,
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      currentFile: undefined,
      text: "",
      noteType: "Text",
      mapData: {
        longitude: null,
        latitude: null,
        reRender: true,
        address: ""
      },
      stateUpdate: false,
      filteredItems: [],
      filter: "All"
    };
  }

  componentDidMount() {
    this.getItems('');
  }
  getItems = (value) => {
    const {filter} = this.state;
    const appData = getLSData();
    const { items = [] } = appData;
    let rows = [];
    let searchText = "";
    searchText = value;
    if (!isEmpty(searchText)) {
      searchText = searchText.replace(/[^\w\s]/gi, "");
    }
    items.forEach(data => {
      let row = data;
      (!searchText ||
        row.text
          .toString()
          .toLowerCase()
          .search(searchText.toLowerCase()) !== -1) &&
        rows.push(row);
    });
    //filter items by filter selected
    if(filter === "All"){
    } else if(filter === "Archive"){
       rows = rows.filter(row => row.archived);
    } else {
      rows = rows.filter(row => filter === "Active" ? !row.checked && !row.archived : row.checked && !row.archived)
    }
    this.setState({ filteredItems: rows, query: searchText});
  }
  changeText = (value) => {
    this.setState({ text: value });
  }
  changeStatus = (id, checked) => {
    const appData = getLSData();
    const { items = [] } = appData;
    let { filteredItems = [], filter } = this.state;
    filteredItems = filteredItems.map(item => {
      let itemObj = {...item, checked: fill(items, {
        id: item.id
      })[0].checked}
      return {
        itemObj
      }
    });
    items.forEach(item => {
      if (item.id === id) {
        item.checked = checked
      };
    });
    appData.items = items;
    setLSData(appData);
    this.setState({ stateUpdate: !this.state.stateUpdate, filteredItems});
    this.getItems('')
  }

  changeFilter = (value) => {
    const appData = getLSData();
    let { items = [] } = appData
    let finalItems=[];
    if(value==="All"){
      finalItems = items;
    } else if(value === "Archive"){
      finalItems = items.filter(item => item.archived);
    } else {
      finalItems = items.filter(item => value === "Active" ? !item.checked && !item.archived : item.checked && !item.archived)
    }
    
    this.setState({ filteredItems: finalItems, filter: value });
  }

  addItem = (noteType) => {
    const { text, currentFile, mapData } = this.state;
    const appData = getLSData();
    let { items = [] } = appData
    const uId = new Date().getTime();
    if (noteType === "Text") {
      items.push({ id: uId, text, checked: false, type: noteType, archived: false });
      appData.items = items;
      setLSData(appData);
      this.setState({ text: "", filteredItems: items });
    } else if (noteType === "Image") {
      this.getBase64(currentFile).then(base64 => {
        items.push({ id: uId, text: currentFile.name, imageData: base64, checked: false, type: noteType, archived: false });
        appData.items = items;
        setLSData(appData);
        this.setState({ currentFile: null, filteredItems: items });
      }).catch((err) => {
        this.setState({
          currentFile: undefined
        });
        alert("Could not upload the image!")
      });
    } else {
      items.push({ id: uId, text: mapData.address, checked: false, type: noteType, archived: false });
      appData.items = items;
      setLSData(appData);
      this.setState({ mapData: {longitude: null, latitude: null, reRender: true, address: ""}, 
      filteredItems: items });
    }
    this.getItems("");
  };

  selectFile = (event) => {
    this.setState({
      currentFile: event.target.files[0]
    });
  };
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  handleRadioChange = (event) => {
    this.setState({
      noteType: event.target.value, text: "", currentFile: null,
      mapData: {
        longitude: null,
        latitude: null,
        reRender: true,
        address: ""
      }
    })
  };
  getCoordinates = (position) => {
    this.setState({ mapData: { ...this.state.mapData, longitude: position.coords.longitude, latitude: position.coords.latitude } })
  }
  handleChangeMapData = (property, value) => {
    this.setState({ mapData: { ...this.state.mapData, [property]: value } })
  };
  deleteItem = (id) => {
    const appData = getLSData();
    let { items = [] } = appData
    let {filteredItems=[]} = this.state;
    filteredItems = filteredItems.filter(item => item.id !== id);
    items = items.filter(item => item.id !== id);
    appData.items = items;
    setLSData(appData);
    this.setState({filteredItems});
  };
  archiveUnarchiveItem = (id, value) => {
    const appData = getLSData();
    let { items = [] } = appData
    let {filteredItems=[]} = this.state;
    filteredItems = filteredItems.map(item => {return {...item, archived: item.id===id ? value : item.archived}});
    items = items.map(item => {return {...item, archived: item.id===id ? value : item.archived}});
    appData.items = items;
    setLSData(appData);
    this.setState({filteredItems});
    this.getItems('')
  };

  render() {
    const { currentFile, text, noteType, mapData, query, filteredItems, filter } = this.state;
    const { getItems, changeFilter, changeStatus, addItem, selectFile, handleRadioChange, changeText,
      getCoordinates, handleChangeMapData, deleteItem, archiveUnarchiveItem } = this;
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item md={6}>
          <Header
            handleRadioChange={handleRadioChange}
            noteType={noteType}
            text={text}
            changeText={changeText}
            selectFile={selectFile}
            currentFile={currentFile}
            addItem={addItem}
            mapData={mapData}
            getCoordinates={getCoordinates}
            handleChangeMapData={handleChangeMapData}
          />
        </Grid>
        <Grid item md={6}>
          <SearchBox query={query} setSearchQuery={getItems} />
          <List items={filteredItems} changeStatus={changeStatus} deleteItem={deleteItem} archiveUnarchiveItem={archiveUnarchiveItem}/>
          <Footer changeFilter={changeFilter} filter={filter}/>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HomePage);