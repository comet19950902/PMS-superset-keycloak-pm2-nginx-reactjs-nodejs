const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    selectedColumnValueTable:null,
    updatedPropsForExcelDownload:null,
    addCheckboxValue:[],
    addArrayForCheckboxItems:[],
    resultShowData:null,
    expandRowCol: false,
    chekcedStatusValue:false,
    hiddenValueForColumn:false,
    editAccountancyRowData:null,
    selectedColumnId:[],
    selectedColumnForUnchecked:null,
    selectedColumnIdValue:null,
    openModalEditRow:false,
    openModalCloneRow:false,
    openModalToAddData:false,
    checkedValue:false,
    openModalToEditSelectedRow:false,
    openCommonModalDeleteStatus:false,
    openModalAddExchangeStatus:false,
    openEditExchangeModalStatus:false,
    sidebarStatus:false,
    getShareHolders:null,
    resultShowFixedData:null,
    alreadySelectedShareholder:null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    
    setOpenModalToAddData(state, action) {
      state.openModalToAddData = action.payload;
    },
    setExpandRowCol(state, action) {
      state.expandRowCol = action.payload;
    },
    setOpenModalEditRow(state,action){
      state.openModalEditRow=action.payload
    },
    setCheckedValue(state,action){
      state.checkedValue=action.payload
    },
    setOpenModalCloneRow(state,action){
      state.openModalCloneRow=action.payload
    },
    setOpenModalToEditSelectedRow(state,action){
        state.openModalToEditSelectedRow=action.payload
    },
    setSelectedColumnValueTable(state,action){
      state.selectedColumnValueTable=action.payload
    },
    setSelectedColumnId(state,action){
      console.log(action);
      if(action.payload.type=="ADD_FILTER")
      {
        state.selectedColumnId=[...state.selectedColumnId,action.payload.value]
      }
      else 
      {
        state.selectedColumnId=state.selectedColumnId?.filter((element)=>element!=action.payload.value)
      }
      // state.selectedColumnId=[...state.selectedColumnId,action.payload]
    },
    setHiddenValueForColumn(state,action){
      state.hiddenValueForColumn=action.payload
    },
    setSelectedColumnIdValue(state,action){
      state.selectedColumnIdValue=action.payload
    },
    setSelectedColumnForUnchecked(state,action){
      state.selectedColumnForUnchecked=action.payload
    },
    setResultShowData(state,action){
      state.resultShowData=action.payload
    },
    setEditAccountancyRowData(state,action){
      state.editAccountancyRowData=action.payload
    },
    setAddArrayForCheckboxItems(state,action){
      console.log(action);
      if(action.payload.type=="ADD_ITEM")
      {
        state.addArrayForCheckboxItems=[...state.addArrayForCheckboxItems,action.payload.value]
      }
      else
      {
        state.addArrayForCheckboxItems=state.addArrayForCheckboxItems.filter((item=>item.Type==state.selectedColumnIdValue))
      }
    },
    setChekcedStatusValue(state,action){
      state.chekcedStatusValue=action.payload
    },
    setAddCheckboxValue(state,action){
      if(action.payload.type=="REMOVE_ITEM")
      {
        state.addCheckboxValue=[]
      }
      else
      {
        state.addCheckboxValue=[...state.addCheckboxValue,action.payload]
      }
    },
    setCheckboxRowDataValue(state,action){
      console.log("action payload ................",action.payload)
      state.addCheckboxValue = [...state.addCheckboxValue,action.payload]
      console.log("addCheckboxValue",state.addCheckboxValue);
    },
    removeCheckboxValue(state,action){
      state.addCheckboxValue=state.addCheckboxValue.filter((item)=>item.game_id !== action.payload.game_id );
      console.log("deleteCheckBoxValue",state.addCheckboxValue);
    },
    setOpenCommonModalDeleteStatus(state,action){
      state.openCommonModalDeleteStatus=action.payload
    },
    setOpenEditExchangeModalStatus(state,action){
      state.openEditExchangeModalStatus=action.payload
    },
    setOpenModalAddExchangeStatus(state,action){
      state.openModalAddExchangeStatus=action.payload
    },
    setSidebarStatus(state,action){
      state.sidebarStatus=action.payload
    },
    setGetShareHolders(state,action){
      state.getShareHolders=action.payload
    },
    setAlreadySelectedShareholder(state,action){
      state.alreadySelectedShareholder=action.payload
    },
    setUpdatedPropsForExcelDownload(state,action){
      state.updatedPropsForExcelDownload=action.payload
    },
    setResultShowFixedData(state,action){
      state.resultShowFixedData=action.payload
    }
  },
});
export const {
  setExpandRowCol,
  setResultShowData,
  setAddCheckboxValue,
  setSelectedColumnForUnchecked,
  setSelectedColumnIdValue,
  setOpenModalEditRow,
  setOpenModalCloneRow,
  setOpenModalToAddData,
  setOpenModalToEditSelectedRow,
  setSelectedColumnValueTable,
  setSelectedColumnId,
  setEditAccountancyRowData,
  setHiddenValueForColumn,
  setAddArrayForCheckboxItems,
  setChekcedStatusValue,
  setCheckboxRowDataValue,
  setCheckedValue,
  setOpenCommonModalDeleteStatus,
  setOpenEditExchangeModalStatus,
  removeCheckboxValue,
  setOpenModalAddExchangeStatus,
  setSidebarStatus,
  setGetShareHolders,
  setAlreadySelectedShareholder,
  setUpdatedPropsForExcelDownload,
  setResultShowFixedData
} = appSlice.actions;
export default appSlice.reducer;