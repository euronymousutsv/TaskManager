import { View,SafeAreaView,StyleSheet,Text, TextInput,Pressable } from "react-native";
import { Image } from 'expo-image';
import { AuthContext } from "../../contexts/AuthContext";
import { DBContext } from "../../contexts/DBContext";
import {useRouter} from "expo-router";
import { useBook } from "../../contexts/BookContext";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Bookinfo(){
   const router = useRouter();
   const {bookId}=useBook();
const IDBook = bookId
const[start, setstart] = useState(false)
const[Author, setAuthor] = useState("")
const[ Description, setDescription] = useState("")
const [bookImage, setbookImage] = useState("")
const [Name, setName] = useState("")
const [PublishedYear, setPublishedYear] = useState("")
const [Data, setData] = useState([])
const db=useContext(DBContext)
const auth=useContext(AuthContext)
    const userId =auth.currentUser.uid 
    const userEmail =auth.currentUser.userEmail
const[comment, setComment] =useState("")

const postComment=async()=>{
    const docRef = doc(db,'Book/${bookId}/Feedback')
    await setDoc(doc(db,"Book/${bookId}/",userId),comment)
    console.log("data saved")
    
}

const loadbookData=async()=>{

    const docRef=doc(db,"Book",bookId)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){

const bookData=docSnap.data();
setAuthor(bookData.Author)
setDescription(bookData.Description)
setbookImage({uri:bookData.Image})
setName(bookData.Name)
setPublishedYear(bookData.PublishedYear)
setData(bookData)
    }else{
        console.log("No such document")
    }

    // setListData(data)

}
useEffect(()=>{
    loadbookData()


},[start])

   useEffect(() => {
    
    loadbookData()
    console.log(bookId);
}, [bookId,db]);
return(
<View style={{ justifyContent: 'center', flex: 1 }}>
     
     <View style={styles.view}>   
                <Image style={styles.Image} source={bookImage}></Image>
               <Text style={styles.title}>Book Details</Text>
               <Text style={styles.inputtxt}>Name</Text>
               <TextInput style={styles.input} editable={false} defaultValue={Name}  />
               <Text style={styles.inputtxt}>Author</Text>
 
              <TextInput style={styles.input} defaultValue={Author} editable={false} />
              <Text style={styles.inputtxt}>PublishedYearr</Text>
              <TextInput style={styles.input}  defaultValue={PublishedYear} editable={false}/>
              <Text style={styles.inputtxt}>Description</Text>
              <Text style ={styles.text}>{Description}</Text>
              <Text style ={styles.text}></Text>
             
  
      
              </View>
   
<View style={styles.view}>
    <Text style={styles.title}>Comment</Text>
    <TextInput style={styles.input}  onChangeText={(text)=>setComment(text)}/>
    <Pressable style={styles.button} onPress={()=> postComment()}>
                <Text style={styles.buttonText}>Post</Text>
            </Pressable>

</View>
  
      </View>
      
)

}
const styles=StyleSheet.create({
    Image:{
        marginLeft:'auto',
        marginRight:'auto',
        height:160,
        width:110,
        flex: 1,
        
        backgroundColor: '#0553',
      },
    icon:{
       
       marginLeft:'auto',
       marginRight:'auto',
       marginBottom:20,
       },
       signOutbtn:{
           flexDirection:'row',
           marginTop:20,
           padding: 10,
           backgroundColor: 'rgb(50, 168, 125)',
           borderRadius: 15,
           marginLeft:"auto",
           marginRight:"auto",
       },
       container:{
           flex:1,
           flexDirection:"column",
           justifyContent:"center",
       },
       ImageBackground:{
           flex:1,
           justifyContent:"center"
   
      },
      view:{
       marginHorizontal: 30,
       padding:20,
       backgroundColor:'white',
       borderRadius:30,
       marginBottom: 10
       
   
      },
      title:{
       fontSize:20
      },
      inputtxt:
      {
       margin:2
      },
      text:{
        borderBottomWidth:2
      },
      input:{
       padding:5,
    borderBottomWidth:2,
    margin:2, 
    justifyContent: 'center'
   
      },
      button:{
       marginTop: 30,
       backgroundColor: 'rgb(50, 141, 168)',
       padding: 10,
       borderRadius:15,
      },
      buttonText: {
       fontWeight: 'bold',
       fontSize:20,
       color: "white",
       textAlign: "center",
   }
})