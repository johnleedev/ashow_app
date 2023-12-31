import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AsyncGetItem from '../AsyncGetItem'
import Schoolinfo from './DetailComponent/Schoolinfo';
import Childcareinfo from './DetailComponent/Childcareinfo';
import Neighborhood from './DetailComponent/Neighborhood';
import FormatNumber from '../Components/FormatNumber';
import CalendarBox from './DetailComponent/CalendarBox';
import PyengSelectModal from './DetailComponent/PyengSelectModal';
import ParkingPublicTransit from './DetailComponent/ParkingPublicTransit';
import Community from './DetailComponent/Community';
import GiftContent from './DetailComponent/GiftContent';
import axios from 'axios';
import MainURL from "../../MainURL";
import { useRoute } from '@react-navigation/native';
import Loading from '../Loading';
import MainImageURL from '../../MainImageURL';
import ContackButtonModal from './DetailPage/ContactButtonModal';


const Detail = (props : any) => {
  
  const [loading, setLoading] = useState<boolean>(true);
  
  const route : any = useRoute();
  const aptData = route.params.data;

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // getposts
  const [pyengInfo, setPyengInfo] = useState<any>([]);
  const [pyengSelect, setPyengSelect] = useState<any>([]);
  const [pyengOrMeter, setPyengOrMeter] = useState("평");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${MainURL}/buildings/pyenginfo/${route.params.data.aptKey}`);
      let copy: any = [...res.data];
      await new Promise((resolve : any) => {
        setPyengInfo(copy);
        resolve();
      });
      await new Promise((resolve : any) => {
        setPyengSelect(copy[0]);
        resolve();
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, []);
  
  const menu = ["분양가", "자금스케줄", "혜택", "단지갤러리", "단지배치도", "주차 및 교통", "학군", "보육시설", "주변환경"]

  const [button1, setButton1] = useState<boolean>(true)
  const [button2, setButton2] = useState<boolean>(false)
  
  const [isSelectedOptions, setIsSelectedOptions] = useState([false, false, false, false]);


  // 평형 선택 모달
  const [pyengSelectModalVisible, setPyengSelectModalVisible] = useState(false);
  const pyengSelectToggleModal = () => {
    setPyengSelectModalVisible(!pyengSelectModalVisible);
  };
  

  // 전화 버튼 모달
  const [contactButtonModalVisible, setContactButtonModalVisible] = useState(false);
  const contactButtonToggleModal = () => {
    setContactButtonModalVisible(!contactButtonModalVisible);
  };
  
  

  return (
    loading 
    ? 
    <Loading />
    :
    <View style={styles.container}>
      {/* 타이틀 섹션 ------------------------------------------------------------- */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
          <TouchableOpacity 
            style={{}}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <Typography fontSize={14} marginBottom={7}>{aptData.name}</Typography>
            <View style={{flexDirection: 'row'}}>
              <Typography fontSize={12} >{aptData.houseHoldSum}세대 / </Typography>
              <Typography fontSize={12} >{aptData.inDate}입주</Typography>
            </View>
          </View>
          <View style={{width: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={{}}
              onPress={()=>{
                props.navigation.navigate('LocationMap', {
                  aptName : aptData.name, aptSitecontact : aptData.sitecontact, 
                  aptPromotionSite : aptData.prometionSite, aptPromotioncontact : aptData.prometioncontact,
                  addressData : `${aptData.addressCity} ${aptData.addressCounty} ${aptData.addressRest}`
                })
              }}
            >
              <Entypo name="location-pin" size={30} color="#E8726E" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {}}
                style={{}}>
                <AntDesign name="sharealt" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {}}
                style={{}}>
                <AntDesign name="staro" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* 서브타이틀 섹션 ------------------------------------------------------------- */}
        <View style={{width: '100%', height:400, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={{uri: `${MainImageURL}/app/images/buildings/apt${aptData.aptKey}/mainimage.png`}} style={{width: '100%', height:'100%', resizeMode:'cover'}}/>
        </View>    
        <View style={styles.section}>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Typography fontSize={24} marginBottom={7}>{aptData.name}</Typography>
            <Typography fontSize={14} marginBottom={7}>{aptData.houseHoldSum}세대 | {aptData.inDate}입주</Typography>
            <Typography fontSize={14} color='#8B8B8B'>{aptData.addressCity} {aptData.addressLocal} {aptData.addressRest}</Typography>  
          </View>
        </View>

        <Divider height={2} marginVertical={10}/>

        <View style={[styles.section, {paddingBottom: 1}]}>
          {/* 서브 메뉴 */}
          <ScrollView 
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
          > 
            {
              menu.map((item, index)=>{
                return (
                  <View style={styles.menubox} key={index}>
                    <Typography>{item}</Typography>
                  </View>
                )
              })
            }
          </ScrollView>

          {/* 평형 선택 ------------------------------------------------------------- */}
          <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems:'center', marginVertical: 20}}>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={pyengSelectToggleModal}>
                <View style={{width:88, height:40, borderWidth:1, borderColor:'#DFDFDF', flexDirection:'row',
                              borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                  <Typography fontSize={14}>{pyengOrMeter === '평' ? pyengSelect.pyeng : pyengSelect.officialArea}</Typography>
                  <AntDesign name="down" size={15} color="#1B1B1B" style={{marginLeft: 5}}/>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={()=>{ 
                if (pyengOrMeter === '평' ) {
                  setPyengOrMeter('㎡');
                } else {
                  setPyengOrMeter('평');
                }
            }}>
              <View style={[styles.selectBox, {width: 40, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}]}>
                <Typography fontSize={14} color='#1B1B1B' fontWeightIdx={2}>{pyengOrMeter}</Typography>
              </View>
            </TouchableOpacity>
          </View>
          {/* 평형 선택 모달창 ------------------------------------ */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={pyengSelectModalVisible}
            onRequestClose={pyengSelectToggleModal}
          >
            <PyengSelectModal 
              pyengSelectToggleModal={pyengSelectToggleModal} pyengInfo={pyengInfo}
              setPyengSelect={setPyengSelect}
            />
          </Modal>

          {/* 배치도 ------------------------------------------------------------- */}
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('GroundPlanDetail', {data : pyengSelect});
            }}
            style={{alignItems:'flex-end'}}
          >
            <View style={[styles.selectBox, {width: 40, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}]}>
              <Image source={require('../images/buildings/magnifyGlass.png')} style={{width: '90%', resizeMode:'contain'}}/>
            </View>
          </TouchableOpacity>
          <View style={{width:'100%', height:300, alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={{uri: `${MainImageURL}/app/images/buildings/apt${aptData.aptKey}/groundplan${pyengSelect.personalArea}.png`}} 
              style={{width: '100%', height:'100%', resizeMode:'contain'}}
            />
          </View>

        </View>

        <Divider height={2} marginVertical={10}/>

        {/* 분양가 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage1.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20} >분양가</Typography>  
          </View>
          {/* 할인 상세 금액 ------------------------------------------------------------- */}
          <TouchableOpacity onPress={()=>{
            setButton1(!button1)
          }}>
            <View style={styles.button}>
              <Typography  color='#ED9390'>할인 상세 금액</Typography>
              <AntDesign name={ button1 ? "up" : "down"} size={20} color="#ED9390" />
            </View>
          </TouchableOpacity>
          {
            button1 
            && 
          <View style={{flex:1, borderWidth:1, borderColor: '#ED9390', borderRadius: 15, padding: 18, marginVertical: 5 }}>
            <View style={styles.textBox}>
              <Typography fontSize={14} >정상 판매 가격</Typography>
              <Typography >{FormatNumber(pyengSelect.priceDefault)}</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} >기본 할인</Typography>
              <Typography fontSize={14} >- {FormatNumber(pyengSelect.discountDefault)}</Typography>
            </View>
            <View style={{height:24, flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
              <AntDesign name="staro" size={20} color="#F9DB7F" style={{marginRight: 5}}/>
              <Typography fontSize={14} color='#1B1B1B'>{asyncGetData.userNickName}님을 위해 아쇼가 준비한 특별 혜택</Typography>
            </View>
           <View style={styles.textBox}>
              <Typography fontSize={14} >첫 계약 축하 할인</Typography>
              <Typography fontSize={14} >- {FormatNumber(pyengSelect.ashowDiscountGriting)}</Typography>
            </View>
            <Divider height={1} marginVertical={2}></Divider>
            <View style={styles.textBox}>
              <Typography fontSize={14} >아쇼 첫 이용 할인</Typography>
              <Typography fontSize={14} >- {FormatNumber(pyengSelect.ashowDiscountFirstUse)}</Typography>
            </View>
            <Divider height={1} marginVertical={2}></Divider>
            <View style={styles.textBox}>
              <Typography fontSize={14} >아쇼 회원 할인</Typography>
              <Typography fontSize={14} >- {FormatNumber(pyengSelect.ashowDiscountMember)}</Typography>
            </View>
            <Divider height={1} marginVertical={2}></Divider>
            <View style={styles.textBox}>
              <Typography fontSize={14} >오늘 계약시 지원금</Typography>
              <Typography fontSize={14} >- {FormatNumber(pyengSelect.ashowDiscountToday)}</Typography>
            </View>
            <Divider height={1} marginVertical={2}></Divider>
            <View style={{height: 28, justifyContent: 'center', alignItems: 'center'}}>
              <Typography fontSize={14} >아쇼를 통해 총  <Text style={{fontSize:18, color: '#FC3C31' }}>{FormatNumber(pyengSelect.discountDefault + pyengSelect.ashowDiscountSum)}</Text>할인 받았어요</Typography>
            </View>
          </View>
          }
          {/* 추가 옵션 선택 ------------------------------------------------------------- */}
          <TouchableOpacity onPress={()=>{
            setButton2(!button2)
          }}>
            <View style={[styles.button, {marginTop: 20}]}>
              <Typography color='#ED9390'>옵션 추가 선택</Typography>
              <AntDesign name={ button2 ? "up" : "down"} size={20} color="#ED9390"/>
            </View>
          </TouchableOpacity>

          {
            button2 
            &&
            <View style={{flex:1, borderWidth:1, borderColor: '#ED9390', borderRadius: 15, padding: 18, marginVertical: 10}}>
              {
                isSelectedOptions.map((item:any, index:any)=>{
                  return (
                    <View key={index}>
                      <TouchableOpacity onPress={() => {
                        const updatedSelections = [...isSelectedOptions];
                        updatedSelections[index] = !updatedSelections[index];
                        setIsSelectedOptions(updatedSelections);
                      }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                          <View style={{
                              width: 24, height: 24, borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                              backgroundColor : isSelectedOptions[0] ? '#E8726E' : '#DFDFDF', 
                            }}>
                            <AntDesign name="check" size={18} color="#fff" />
                          </View>
                          <View style={styles.textBox2}>
                            {/* <Typography fontSize={14}>발코니 확장 공사비</Typography> */}
                            {/* <Typography fontSize={14}>+ {FormatNumber(pyengSelect.optionBalcony)}</Typography> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Divider height={1} marginVertical={5}/>
                    </View>
                  )
                })
              }
              
            </View>
          }
          
          <Divider height={2} marginVertical={20}/>
          
          {/* 최종 금액 ------------------------------------------------------------- */}
          {/* <View>
            <Typography fontSize={18}>{asyncGetData.userNickName}님의 최종 구매 가능 가격</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>정상 판매가</Typography>
            <Typography fontSize={14} color='#8B8B8B'>{FormatNumber(aptData.priceDefault)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>아쇼 할인</Typography>
            <Typography fontSize={14} color='#8B8B8B'>- {FormatNumber(aptData.discountDefault)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>추가 옵션</Typography>
            <Typography fontSize={14} color='#8B8B8B'>+ {FormatNumber(sumOption)}</Typography>
          </View>
          <Divider/>
          <View style={styles.textBox}>
            <Typography >최종 구매 가격</Typography>
            <Typography fontSize={20} color='#E0413B'>{FormatNumber(sumPrice)}</Typography>
          </View> */}
        </View>

        <Divider height={8}/>

        {/* 자금스케줄 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage2.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>{asyncGetData.userNickName}님의 자금 스케줄</Typography>  
          </View>
          <View style={{width: '100%', marginVertical: 15}}>
            <Image source={require('../images/buildings/schedule.png')} style={{width: '100%', height: 450}}/>
          </View>
          <CalendarBox></CalendarBox>

          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('CalculatorFirst', {
                aptName : aptData.name,
              })
            }}
          >
            <View style={[styles.button2, {justifyContent: 'center'}]}>
              <Typography fontSize={16} color='white'>자금 스케줄 확인하기</Typography>
              <AntDesign name="right" size={20} color="white" style={{ marginLeft : 10}}/>
            </View>
          </TouchableOpacity>
        </View>  
      
        <Divider height={8}/>

        {/* 혜택 모아보기 섹션  ------------------------------------------------------------- */}
        <View style={styles.section}>
          <GiftContent/>
        </View>

        <Divider height={8}/>

        {/* 단지 갤러리 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage4.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>단지 갤러리</Typography>  
          </View>
          <Typography fontSize={12} fontWeightIdx={2}>이미지를 옆으로 넘기거나 탭해서 단지 갤러리를 확인해보세요!</Typography>
          <View style={{height: 300, marginVertical: 15}}>
            <ScrollView 
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
            > 
              <Image source={require('../images/buildings/galleryImage1.png')} style={styles.galleryImage}/>
              <Image source={require('../images/buildings/galleryImage2.png')} style={styles.galleryImage}/>
              <Image source={require('../images/buildings/galleryImage3.jpg')} style={styles.galleryImage}/>
              <Image source={require('../images/buildings/galleryImage4.png')} style={styles.galleryImage}/>
            </ScrollView>
          </View>
        </View>

        <Divider height={8}/>
        
        {/* 단지 배치도 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage5.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>단지 배치도</Typography>  
          </View>
          <Typography fontSize={12} fontWeightIdx={2}>이미지를 탭해서 상세 배치도와 평면도를 확인해보세요!</Typography>
          <View style={{height: 250, marginVertical: 15}}>
            <Image source={require('../images/buildings/arrangeImage.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
            <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate('단지 배치도', { uri: 'https://www.ashow.co.kr/customimage/arrangeimage.png'})
              }}
              style={{position: 'absolute', right: 0, backgroundColor: 'black', borderRadius: 5}}>
              <MaterialCommunityIcons name="image-search" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Divider height={8}/>

        {/* 커뮤니티 시설 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <Community/>
        </View>    

        <Divider height={8}/>

        {/* 주차 및 교통정보 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <ParkingPublicTransit 
            aptData={aptData}
          />
        </View>

        <Divider height={8}/>

        {/* 학군정보 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage8.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>학군정보</Typography>  
          </View>
          <Schoolinfo></Schoolinfo>
          <View style={{marginVertical: 15}}></View>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage9.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>반경 1km 내 보육시설</Typography>
          </View>
          <Childcareinfo></Childcareinfo>
        </View>

        <Divider height={8}/>

        {/* 주변환경 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage10.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>주변환경</Typography>  
          </View>
          <Neighborhood></Neighborhood>    
        </View>

     
      </ScrollView>

      {/* 전화 버튼 모달 */}
      <TouchableOpacity 
        style={{position:'absolute', right: 10, bottom: 10, }}
        onPress={contactButtonToggleModal}
      >
        <View style={{width:56, height:56, backgroundColor:"#E8726E",
                      borderRadius:28, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome name="phone" size={24} color="#fff"/>
        </View>
      </TouchableOpacity>
      {/* 전화 버튼 모달창 ------------------------------------ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactButtonModalVisible}
        onRequestClose={contactButtonToggleModal}
      >
        <ContackButtonModal 
          contactButtonToggleModal={contactButtonToggleModal}
          sitePhone={aptData.sitePhone}
        />
      </Modal>

      {/* 모달 백화면 커버창 */}
      <View style={pyengSelectModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={contactButtonModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    section: {
      padding: 22,
    },
    selectBox: {
      height: 40,
      backgroundColor: 'white',
      borderColor: '#DFDFDF',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    menubox: {
      width: 90,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      marginVertical: 10
    },
    sectionTitleImage : {
      width: 24, 
      height: 16,
      marginRight: 10
    },
    button : {
      height: 48,
      backgroundColor : 'white',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#ED9390',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginVertical: 5
    },
    button2 : {
      height: 48,
      backgroundColor : '#ED9390',
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginVertical: 10
    },
    textBox: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },
    textBox2: {
      flex: 1,
      paddingHorizontal: 15,
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },    
    
    galleryImage : {
      width: 320,
      height: '100%'
    },
    modalBackCover : {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#333',
      opacity: 0.8,
      zIndex: 1
    },
  });
  