import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import axios from 'axios';
import AlertDialog from './modal';
import '@material/mwc-linear-progress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Highlighter from "react-highlight-words";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// import SearchAvanced from './search_advanced';

// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />; 
// Cac chu de tim kiem
const topTopic = [{topic: 'Du lịch'},{topic: 'Đời sống'}, {topic: 'Giáo dục'}, {topic: 'Giải trí'}, {topic: 'Khoa học'}, {topic: 'Kinh doanh'}, {topic: 'Pháp luật'}, {topic: 'Số hóa'}, {topic: 'Sức khỏe'}, {topic: 'Thế giới'}, {topic: 'Thể thao'}, {topic: 'Thời sự'}];


// Top author co tren 1000 bai viet
const topAuthor = [{author: 'An Hồng'}, {author: 'Anh Minh'}, {author: 'Anh Ngọc'}, {author: 'Giang Chinh'}, {author: 'Hoàng Táo'}, {author: 'Huyền Lê'}, {author: 'Hà Thu'}, {author: 'Hồng Hạnh'}, {author: 'Khánh Lynh'}, {author: 'Lê Hoàng'}, {author: 'Lệ Chi'}, {author: 'Mai Lâm'}, {author: 'Nguyễn Hoàng'}, {author: 'Nguyễn Đông'}, {author: 'Ngọc Ánh'}, {author: 'Như Tâm'}, {author: 'Phương Vũ'}, {author: 'Phạm Dự'}, {author: 'Quốc Thắng'}, {author: 'Trọng Giáp'}, {author: 'Tử Quỳnh'}, {author: 'Việt Dũng'}, {author: 'Võ Hải'}, {author: 'Vũ Anh'}, {author: 'Vũ Hoàng'}, {author: 'Vũ Lê'}, {author: 'Ánh Ngọc'}, {author: 'Đoàn Loan'}, {author: 'Đức Hùng'}]


const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifytitle: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));


class CheckboxesTags extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      topic: [{topic: "*"}],
      title_decription_content:'*',
      author:[{author: "*"}],
      loading: false,
      titleData: [
        // {topic: 'Thời_sự', title: ['Đoạn quốc_lộ 91 nguy_cơ sụp xuống sông Hậu '], decription: ['Khoảng 20 m quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú bị rạn_nứt kéo_dài giữa đường , nguy_cơ trôi xuống sông Hậu . '], post_time: ['Thứ bảy, 23/5/2020, 20:27 (GMT+7)'], author : 'Cửu Long ', content: ['Khoảng 20 m quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú bị rạn_nứt kéo_dài giữa đường , nguy_cơ trôi xuống sông Hậu . ', 'Đoạn quốc_lộ bị nứt được người dân phát_hiện ngày 23 / 5 , nằm cách bờ sông Hậu 3 - 7 m . Phía sát bờ sông đất trống nhưng bên trong quốc_lộ hơn 20 m là dãy nhà dân_sinh_sống . Vị_trí này cách nơi ', 'đầu tháng 8 / 2019 khoảng 80 m , nằm trong khu_vực cảnh_báo nguy_hiểm . ', 'Vết nứt sát bờ sông Hậu trên quốc_lộ 91 ở xã Bình_Mỹ , huyện Châu_Phú . Ảnh : ', 'Phó_chủ_tịch UBND huyện Châu_Phú Nguyễn_Thanh_Lâm cho biết , địa_phương đang lắp kéo dây khoanh vùng và gắn biển cảnh_báo ; bố_trí lực_lượng ứng_trực 24 / 24 để xử_lý tình_huống xấu xảy ra ; hướng_dẫn người dân lưu_thông trên đường tránh mới mở , cách bờ sông Hậu khoảng 1,2 km . ', 'Đồng_thời , cơ_quan_chức_năng đang thống_kê các hộ dân có nguy_cơ ảnh_hưởng để có phương_án di_dời tránh tình_trạng nguy_hiểm . ', 'Trước đó , đầu tháng 8 năm_ngoái , đoạn quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú từng bị sạt_lở khoảng 100 m , ăn sâu vào trong khoảng 25 m . ', 'Biển_báo đoạn nguy_cơ sạt_lở trên quốc_lộ 91 . Ảnh : ', 'Để đảm_bảo an_toàn giao_thông An_Giang khẩn_cấp làm đường tránh dài 5 km qua khu_vực này với kinh_phí khoảng 250 tỷ đồng . Đến nay việc ổn_định đường bờ , gia_cố mái ta_luy , lấp hố xoáy đã hoàn_tất . ', 'Quốc_lộ 91 dài 142 km , nối từ TP Cần_Thơ đến cửa_khẩu Tịnh_Biên , tỉnh An_Giang . Đây là một trong những tuyến đường huyết_mạch của An_Giang và các địa_phương lân_cận cũng như giao_thương với Campuchia . ', 'Vị_trí nguy_cơ sạt_lở trên quốc_lộ 91 . Ảnh : '], link_img: 'https://i1-vnexpress.vnecdn.net/2020/05/23/Vet-nut-giua-quoc-lo-91-sat-bo-8207-2135-1590231179.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=pbmBnXOnbQoxXSSffEAZag', link_post: 'https://vnexpress.net/doan-quoc-lo-91-nguy-co-sup-xuong-song-hau-4104134.html', title_decripton_content: 'Đoạn quốc_lộ 91 nguy_cơ sụp xuống sông Hậu Khoảng 20 m quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú bị rạn_nứt kéo_dài giữa đường , nguy_cơ trôi xuống sông Hậu . Khoảng 20 m quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú bị rạn_nứt kéo_dài giữa đường , nguy_cơ trôi xuống sông Hậu . Đoạn quốc_lộ bị nứt được người dân phát_hiện ngày 23 / 5 , nằm cách bờ sông Hậu 3 - 7 m . Phía sát bờ sông đất trống nhưng bên trong quốc_lộ hơn 20 m là dãy nhà dân_sinh_sống . Vị_trí này cách nơi đầu tháng 8 / 2019 khoảng 80 m , nằm trong khu_vực cảnh_báo nguy_hiểm . Vết nứt sát bờ sông Hậu trên quốc_lộ 91 ở xã Bình_Mỹ , huyện Châu_Phú . Ảnh : Phó_chủ_tịch UBND huyện Châu_Phú_Nguyễn_Thanh_Lâm cho biết , địa_phương đang lắp kéo dây khoanh vùng và gắn biển cảnh_báo ; bố_trí lực_lượng ứng_trực 24 / 24 để xử_lý tình_huống xấu xảy ra ; hướng_dẫn người dân lưu_thông trên đường tránh mới mở , cách bờ sông Hậu khoảng 1,2 km . Đồng_thời , cơ_quan_chức_năng đang thống_kê các hộ dân có nguy_cơ ảnh_hưởng để có phương_án di_dời tránh tình_trạng nguy_hiểm . Trước đó , đầu tháng 8 năm_ngoái , đoạn quốc_lộ 91 qua xã Bình_Mỹ , huyện Châu_Phú từng bị sạt_lở khoảng 100 m , ăn sâu vào trong khoảng 25 m . Biển_báo đoạn nguy_cơ sạt_lở trên quốc_lộ 91 . Ảnh : Để đảm_bảo an_toàn giao_thông An_Giang khẩn_cấp làm đường tránh dài 5 km qua khu_vực này với kinh_phí khoảng 250 tỷ đồng . Đến nay việc ổn_định đường bờ , gia_cố mái ta_luy , lấp hố xoáy đã hoàn_tất . Quốc_lộ 91 dài 142 km , nối từ TP Cần_Thơ đến cửa_khẩu Tịnh_Biên , tỉnh An_Giang . Đây là một trong những tuyến đường huyết_mạch của An_Giang và các địa_phương lân_cận cũng như giao_thương với Campuchia . Vị_trí nguy_cơ sạt_lở trên quốc_lộ 91 . Ảnh : '}
      ],
        loading : false,
        find: false,
        show_score: false,
        show_highlight: false,
        type_search: "full text search",
        startDate: null,
        endDate: null,
        valueTitle: 0,
        valueDescription: 0,
        valueContent: 0,
        valueAuthor: 0,
        isVisual: false,
        search: "STANDARD",
        time_query: null

    }
  }

  handleStartDate = e =>{
    var date = new Date(Date.parse(e))
    console.log(date)
    
  
    this.setState({
      startDate: e
    })
  }
  handleEndDate = e => {
    this.setState({
      endDate: e
    })
  }
  
  onChangeTopic = (e,topic)=>{
    this.setState({
      topic: topic
    })
  }
  onChangeAuthor = (e,author)=>{
    this.setState({
      author: author
    })
  }

  handleChangeTypeSearch = e => {

    console.log(e.target.value)
    this.setState({
      type_search: e.target.value
    })
    
  }

  handleChangeSearch = e =>{
    this.setState({
      search: e.target.value,
      // isVisual:false
    })
    // standard
    if (e.target.value === "STANDARD"){
      // console.log("BASIC")
      this.setState({
        isVisual: false
      })
    }else{
      this.setState({
        isVisual:true
      })
      // console.log(e.target.value)
    }
  
  }

  handleChangeScore = e =>{
    console.log(e.target.checked)
    this.setState({
      show_score: e.target.checked
    })
  }
  handleChangeHighLight = e =>{
    this.setState({
      show_highlight: e.target.checked
    })
  }


  handleSearch = ()=>{
    this.setState({
      loading: true,
      find: true,
      titleData: []
    })
    var config = { headers: {  
      'title-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
                  }
    axios.post("http://localhost:9090/api",
    {
      topic: this.state.topic,
      title_decription_content: this.state.title_description_content,
      author: this.state.author,
      type_search: this.state.type_search,
      date:[this.state.startDate,this.state.endDate],
      search: this.state.search,
      value: {"valueTitle": this.state.valueTitle,"valueDecription":this.state.valueDescription,"valueContent":this.state.valueContent,"valueAuthor":this.state.valueAuthor}

    }, config).then(
       (res) => {
        console.log(res.data)
        this.setState({
          loading: false,
          find: true,
          titleData: [ ... this.state.titleData,... res.data["arr_results"]],
          time_query: res.data["time"]
        })
        
        
        

      }
    )

  }

  // Ham xu ly lay state trong Search_Advanced
    handleChangeTitle = (e,value)=> {
        this.setState({
            valueTitle: value
        })
        console.log("Title",value)
    }
    handleChangeDescription = (e,value) => {
        this.setState({
            valueDescription: value
        })
        console.log("Description",value)
    }
    handleChangeContent = (e,value) => {
        this.setState({
            valueContent: value
        })
        console.log("Content",value)
    }
    handleChangeAuthor = (e,value) => {
        this.setState({
            valueAuthor: value
        })
        console.log("Author",value)
    }
  
  render(){
    const classes = {useStyles};


    return(

      <React.Fragment>
      
      <Container fixed>

        {/* <div>Search Avanced OR Search Basic</div> */}
        <Grid xs = {6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">SEARCH </InputLabel>
          <Select
            native
            value={this.state.search}
            onChange={this.handleChangeSearch}
          >
            {/* standard */}
            <option value={"STANDARD"} >STANDARD</option>
            <option value={"DISMAX"} >DISMAX</option>
          </Select>
        </FormControl>
        </Grid>

        


        {/* -----------------------Search Avanced ------------------------ */}
        {this.state.isVisual && <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Typography id="discrete-slider" gutterBottom>
                                            Title
                                        </Typography>
                                        <Slider
                                            defaultValue={0}
                                            value = {this.state.valueTitle}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={10}
                                            onChange = {this.handleChangeTitle}
                                        />
                                  </Grid>
                                  <Grid item xs={3}>
                                  <Typography id="discrete-slider" gutterBottom>
                                            Description
                                        </Typography>
                                        <Slider
                                            defaultValue={0}
                                            value = {this.state.valueDescription}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={10}
                                            onChange = {this.handleChangeDescription}
                                        />
                                  </Grid>
                                  <Grid item xs={3}>
                                  <Typography id="discrete-slider" gutterBottom>
                                            Content
                                        </Typography>
                                        <Slider
                                            defaultValue={0}
                                            value = {this.state.valueContent}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={10}
                                            onChange = {this.handleChangeContent}
                                        />
                                  </Grid>
                                  <Grid item xs={3}>
                                  <Typography id="discrete-slider" gutterBottom>
                                            Author
                                        </Typography>
                                        <Slider
                                            defaultValue={0}
                                            value = {this.state.valueAuthor}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={10}
                                            onChange = {this.handleChangeAuthor}
                                        />
                                  </Grid>
                                </Grid>}


        {/* <SearchAvanced/> */}
        {/* ---------------------------------------------------------------- */}
        {/*------------------------  Search Basic ------------------------- */}
      { !this.state.isVisual && <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          onChange = {this.onChangeTopic}
                          multiple
                          options={topTopic}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.topic}
                          renderOption={(option, { selected }) => (

                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.topic}
                            </React.Fragment>

                          )}
                          // style={{ width: 500, height:20 }}
                          style ={{marginTop:20}}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Topics" placeholder="Topic Favorites"  />
                          )}
                        />
                        
                      </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                          onChange = {this.onChangeAuthor}
                          multiple
                          options={topAuthor}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.author}
                          renderOption={(option, { selected }) => (

                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.author}
                            </React.Fragment>

                          )}
                          // style={{ width: 500, height:70 }}
                          style ={{marginTop:20}}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Top authors more than 1000 posts" placeholder="Author Favorites"  />
                          )}
                        />
                      </Grid>
                      <Grid item  xs = {6} >
                          <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="age-native-simple">TYPE SEARCH</InputLabel>
                              <Select
                                native
                                value={this.state.type_search}
                                onChange={this.handleChangeTypeSearch}
                              >
                                <option value={"full text search"}>Full text search</option>
                                <option value={"keywords"}>Keywords</option>
                              </Select>
                            </FormControl>
                
                      </Grid>
                    <Grid item xs = {6} >
                        
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Start Date"
                              format="dd/MM/yyyy"
                              value={this.state.startDate}
                              onChange={this.handleStartDate}
                            />
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="End Date"
                              format="dd/MM/yyyy"
                              value={this.state.endDate}
                              onChange={this.handleEndDate}
                            />

                        </Grid>
                          </MuiPickersUtilsProvider>
                          
                    </Grid>
                    </Grid>}
        {/* --------------------------------------------------------- */}

        <Grid item xs={12}>
          <SearchBar
            value ={this.state.title_description_content}
            onChange={(newValue) => this.setState({ title_description_content: newValue})}
            onRequestSearch={this.handleSearch}
            // style = {
            //   {width: 1160}
            // }
            
          />
        </Grid>
        
      {/* </Grid> */}
        <FormControlLabel
          control={
            <Switch
              checked={this.state.show_score}
              onChange={this.handleChangeScore}
              name="show_score"
              color="primary"
            />
          }
          label="show score"
        />

      <FormControlLabel
              control={<Switch checked={this.state.show_highlight} onChange={this.handleChangeHighLight} name="show_highlight" />}
              label="show highlight"
            />
          <GridList cellHeight={200} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} rows={1} style={{ height: 80 }}>
             {this.state.find && <ListSubheader component="div" >RESULT SEARCH</ListSubheader>} 
            
             {this.state.loading && <mwc-linear-progress indeterminate></mwc-linear-progress>}
             {!this.state.loading && <div>{this.state.time_query}</div>}
            </GridListTile>
            {this.state.titleData.map((tile) => (
              <GridListTile key={tile.topic} cols={1/2}>
                <img src={tile.link_img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>By: {tile.author} <br/> 
                                  Date time:{tile.post_time} <br/>
                                  {this.state.show_score && <span>Score: {tile.score}</span>}
                                  </span>
                        }
                  actionIcon={
                    <AlertDialog 
                    title = {tile.title} 
                    content = {tile.content.map((t)=>(
                                              <p><Highlighter
                                                  highlightClassName="YourHighlightClass"
                                                  searchWords={ this.state.show_highlight ? tile.tag: []}
                                                  autoEscape={true}
                                                  textToHighlight={t}
                                                /></p>))} 
                    link_post ={tile.link_post}
                    />
                  }
                />
              </GridListTile>
            ))}
          </GridList>
      </Container>
    </React.Fragment>
    
 
    )
  }
}

export default CheckboxesTags;

