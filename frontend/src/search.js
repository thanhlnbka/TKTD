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



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />; 
// Cac chu de tim kiem
const topTopic = [{topic: 'Du lịch'},{topic: 'Đời sống'}, {topic: 'Giáo dục'}, {topic: 'Giải trí'}, {topic: 'Khoa học'}, {topic: 'Kinh doanh'}, {topic: 'Pháp luật'}, {topic: 'Số hóa'}, {topic: 'Sức khỏe'}, {topic: 'Thế giới'}, {topic: 'Thể thao'}, {topic: 'Thời sự'}];


// Top author co tren 1000 bai viet
const topAuthor = [{author: 'An Hồng'}, {author: 'Anh Minh'}, {author: 'Anh Ngọc'}, {author: 'Giang Chinh'}, {author: 'Hoàng Táo'}, {author: 'Huyền Lê'}, {author: 'Hà Thu'}, {author: 'Hồng Hạnh'}, {author: 'Khánh Lynh'}, {author: 'Lê Hoàng'}, {author: 'Lệ Chi'}, {author: 'Mai Lâm'}, {author: 'Nguyễn Hoàng'}, {author: 'Nguyễn Đông'}, {author: 'Ngọc Ánh'}, {author: 'Như Tâm'}, {author: 'Phương Vũ'}, {author: 'Phạm Dự'}, {author: 'Quốc Thắng'}, {author: 'Trọng Giáp'}, {author: 'Tử Quỳnh'}, {author: 'Việt Dũng'}, {author: 'Võ Hải'}, {author: 'Vũ Anh'}, {author: 'Vũ Hoàng'}, {author: 'Vũ Lê'}, {author: 'Ánh Ngọc'}, {author: 'Đoàn Loan'}, {author: 'Đức Hùng'}]


const useStyles = makeStyles((theme) => ({
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

    }
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

  handleChange = e =>{
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
    axios.post("http://localhost:8892/api",
    {
      topic: this.state.topic,
      title_decription_content: this.state.title_description_content,
      author: this.state.author
    }, config).then(
       (res) => {
        this.setState({
          loading: false,
          find: true,
          titleData: [ ... this.state.titleData,... res.data]
        })
        console.log(res.data.tag)
        
        

      }
    )

  }
  
  render(){
    const classes = {useStyles};


    return(

      <React.Fragment>
      <CssBaseline />
      <Container fixed>
      {/* <div className={classes.root}> */}
      <Grid container spacing={3}>
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
        
      </Grid>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.show_score}
              onChange={this.handleChange}
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
    {/* </div> */}
        {/* <div className={classes.root}> */}
          <GridList cellHeight={200} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} rows={1} style={{ height: 80 }}>
             {this.state.find && <ListSubheader component="div" >RESULT SEARCH</ListSubheader>} 
            
             {this.state.loading && <mwc-linear-progress indeterminate></mwc-linear-progress>}
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
        {/* </div> */}
      </Container>
    </React.Fragment>
    
 
    )
  }
}

export default CheckboxesTags;

