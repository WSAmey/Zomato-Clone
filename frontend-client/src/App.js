import { createContext } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
// import FilterData from './components/Day 83 DIY/FilterData';
// import About from './components/Day 76 DIY/About';
// import Form from './components/Day 74 DIY/Form';
// import Table from './components/Day 75 DIY/Table';
// import Home from './components/Day 76 DIY/Home';
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Product from './components/Day 76 DIY/Product';
// import ProductPage from './components/Day 76 DIY/ProductPage';
// import InlineComponent from './components/Day 77 DIY/InlineComponent';
// import StyleComponent from './components/Day 77 DIY/StyleComponent';
// import Counter from './components/Day 78 DIY/Counter1';
// import Post from './components/Day 78 DIY/Post';
// import ComponentA from './components/Day 79 DIY/ComponentA';
import HomePage from './components/Day 82 DIY/HomePage';
import FilterData from './components/Day 83 DIY/FilterData';
import Header from './components/Day 84 DIY/Header';
import QuickSearches from './components/Day 82 DIY/QuickSearches';
import Details from './components/Day 82 DIY/Details';
import Success from './components/Day 82 DIY/Success';
import Cancel from './components/Day 82 DIY/Cancel';
// import Parent from './components/Day 73 DIY/Parent';
// import Counter from './components/Day 71 DIY/Counter';
// import Userdata from './components/Day 71 DIY/Userdata';
// import ClassApp from './components/Day 72 DIY/ClassComponent';
// import ClassApp1 from './components/Day 72 DIY/ClassComponent2';
// import Classcomp from './components/Day 70 DIY/Classcomp';
// import Funccomponent from './components/Day 70 DIY/Funccomponent';


const data=createContext();
const data1=createContext();
const data2=createContext();

function App() {
  
  // Day 79 DIY
  // const orgname="Edureka";
  // const course="Full Stack Web Development";
  // const students = [
  //   {
  //     firstName:
  //     "Lena",
  //     lastName:
  //     "Smith",
  //     rollNo: 12,
  //     },
  //     {
  //     firstName:
  //     "Tom", lastName:
  //     "Taylor",
  //     rollNo: 16,
  //     },
  //     {
  //     firstName:
  //     "Jhon",
  //     lastName:
  //     "smith",
  //     rollNo: 87,
  //     },
  // ];
      
  return (

    <div className="App">
    {/* Day 70 task */}
      {/* <Classcomp/>
      <Funccomponent/> */}

      {/* Day 71 task */}
      {/* <h1>Users</h1>
      <Userdata fname={"Tony"} lname={"Stark"}/>
      <Userdata fname={"James"} lname={"Mary"}/>
      <Userdata fname={"Tony"} lname={"Stark"}/> */}

      {/* Day 72 task */}

      {/* <Counter/> */}
      {/* <ClassApp/> */}
      {/* <ClassApp1/> */}

      {/* Day 73 task */}
      {/* <Parent/> */}
      {/* Day 74 task */}
      {/* <Form/> */}
      {/* Day 75 */}
      {/* <Table/> */}
      {/* Day 76 */}
      {/* <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/products' element={<Product/>}/>
          <Route path='/products/:val' element={<ProductPage/>}/>

        </Routes>
      </Router> */}
      {/* Day 77 DIY */}
      {/* <InlineComponent/>
      <StyleComponent/> */}

      {/* Day 78 DIY */}
      {/* <Counter/> */}
      {/* <Post/> */}
      {/* Day 79 DIY */}
      {/* create, provider, useContext */}
      
      {/* <data.Provider value={orgname}>
        <data1.Provider value={course}>
          <data2.Provider value={students}>
            <ComponentA/>
          </data2.Provider>
        </data1.Provider>
      </data.Provider> */}
      {/* Day 82, 83 Task */}
      <Router>
        <Routes>
          <Route path='/'  element={<HomePage/>}/>
          <Route path='/filterData/:id/:name' element={<FilterData/>}/>
          <Route path='/details' element={<Details/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/cancel' element={<Cancel/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
export {data,data1,data2}


