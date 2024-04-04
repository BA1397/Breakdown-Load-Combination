
import * as React from 'react';
import { GuideBox, Panel } from '@midasit-dev/moaui';
import Sep from '@midasit-dev/moaui/Components/Separator';
import { useSnackbar,SnackbarProvider } from 'notistack';

import { Stack } from '@midasit-dev/moaui'
// UserDefined Components
import * as Buttons from './Components/Buttons'
import { midasAPI } from './Function/Common';
import { VerifyUtil, VerifyDialog } from "@midasit-dev/moaui";
import Textfield from '@midasit-dev/moaui/Components/TextField';
import { CheckGroup,Check} from "@midasit-dev/moaui";
import { Button } from '@midasit-dev/moaui';
import { Radio, RadioGroup } from "@midasit-dev/moaui";
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from "@midasit-dev/moaui";

// const { enqueueSnackbar } = useSnackbar();
//Snack Bar
const enqueueMessage = (func, message, variant = "") => {
  func(
    message,
      {
        variant: variant,
        autoHideDuration: 3000,
        anchorOrigin:{ vertical: "top", horizontal: "center" }
      },
  );
};
// const handleSnackbar = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   enqueueMessage(enqueueSnackbar, "Review Alignments Data Row", "error");
// };

//Separator
function Separator() {
	return (
		<div width="100%">
			<Sep direction="vertical" />
		</div>
	);
}
function App() 
{
const [showDialog, setDialogShowState] = useState(false);
const [comb, setComb]=useState({});
const [elem, setelement]=useState({});
const [elementList, setElementList] = useState([]);
const [firstSelectedElement, setFirstSelectedElement] = useState(null);
const { enqueueSnackbar } = useSnackbar()
// let errorMessage;
  //Data Check then Action
  const enqueueMessage = (func, message, variant = "") => {
    func(
      message,
        {
          variant: variant,
          autoHideDuration: 3000,
          anchorOrigin:{ vertical: "top", horizontal: "center" }
        },
    );
  };
  function importData() {
    

  };

  //Clear Data Grid
  function BreakdownData() {

  }

async function fetchElement() {
  try {
    // Call midasAPI to get all load combinations directly
    const elementlist= await midasAPI("GET", "/view/select")
    let rtelementlist;
    // Process the response to determine the status
    if ("message" in elementlist) {
       rtelementlist = ["error", "ElementList: " + elementlist.message];
       } else if ("error" in elementlist) {
       rtelementlist = ["error", "ElementList: " + elementlist.error.message];
             } else if ("elementlist" in elementlist) {
               rtelementlist = ["success", "ElementList: data fetched successfully"];
             } else {
               rtelementlist = ["error", "ElementList: unknown error"];
             }
    // Process data if needed
    console.log(elementlist);
    console.log(elementlist["SELECT"]["ELEM_LIST"]);
    // console.log(elementlist["ELEM_LIST"]);
    setFirstSelectedElement(elementlist["SELECT"]["ELEM_LIST"][0]);
    setelement(elementlist["SELECT"]["ELEM_LIST"]);
    // setComb(elementlist["LCOM-GEN"]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error if needed
  }
};
useEffect(() => {
  fetchElement();
},[])

// const handleClick = () => {
//   enqueueSnackbar('Select only one element!', { variant: 'error' });
// };
const handleClick = () => {
    enqueueMessage(enqueueSnackbar, "Select only one element", "error");
  };



 
    async function fetchData() {
      try {
        // Call midasAPI to get all load combinations directly
        const resLoadCombinations = await midasAPI("GET", "/db/lcom-gen");
        // Process the response to determine the status
        let rtLoadCombinations;
        if ("message" in resLoadCombinations) {
          rtLoadCombinations = ["error", "Load Combinations: " + resLoadCombinations.message];
        } else if ("error" in resLoadCombinations) {
          rtLoadCombinations = ["error", "Load Combinations: " + resLoadCombinations.error.message];
        } else if ("loadcombinations" in resLoadCombinations) {
          rtLoadCombinations = ["success", "Load Combinations: data fetched successfully"];
        } else {
          rtLoadCombinations = ["error", "Load Combinations: unknown error"];
        }
        // Process data if needed
        console.log(resLoadCombinations["LCOM-GEN"][1]["NAME"]);
        console.log(resLoadCombinations["LCOM-GEN"]);
        setComb(resLoadCombinations["LCOM-GEN"]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }
    useEffect(() => {
      fetchData();
    }, []);  // Empty dependency array ensures it runs only once on mount

useEffect(() => {
    if (
      !VerifyUtil.isExistQueryStrings("redirectTo") &&
      !VerifyUtil.isExistQueryStrings("mapiKey")
    ) {
      setDialogShowState(true);
    }
  }, []);
// const { enqueueSnackbar } = useSnackbar();
const combArray=Object.values(comb);
const elementArray=Object.values(elem);
console.log(elementArray);


  //Main UI
  return (
    <div className="App" >
      {/* {showDialog && <MKeyDialog />} */}
      {showDialog && <VerifyDialog />}
      <GuideBox
        padding={2}
        center
      >
      <Panel width={520} height={380} variant='shadow2'>
          <div style={{display: 'flex', justifyContent:'space-between'}}>
          <Panel width={255} height={300} marginX={1} marginTop={2} >
          <div style={{color:'gray',fontSize:'14px',marginBottom:'10px'}}>Select Load Combination</div>
          <RadioGroup
            onChange={function noRefCheck(){}}>
          {combArray.map((c)=>
          <Radio name={c["NAME"]} value="LCB1"/>
            ) }           
          </RadioGroup>
          </Panel>
          <Panel width={255} height={300} marginTop={2} padding={0.25}>
            <div style={{display: 'flex',flexDirection:'column',margin:"10px",justifyContent:'space-between'}}>
            <span style={{ fontSize: '14px', color: 'gray' }}>Options for Breakdown</span>
            <br></br>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{ fontSize: '14px', height: '24px', display: 'inline-block', verticalAlign: 'bottom', marginTop: '4px' }}>LCB Title:</span>
              <Textfield  id="my-textfield" defaultValue="" height={{height: "0px"}} onChange={function noRefCheck(){}} placeholder="placeholder text" title="" titlewidth="70px" width="120px" spacing="50px"/ >
            </div>
            <br></br>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{ fontSize: '14px',marginTop: '0px'}}>Target Element</span>
              <div style={{ borderBottom: '1px solid gray', height: '16px', width: '100px',display:'flex', justifyContent:'center',alignItems:'center'}}>
                {/* <div  style={{fontSize:'12px', paddingBottom:'2px'}}>{elementArray.map((element, index) => (
    <div key={index}>{element}</div>
  ))}</div>
          <div  style={{fontSize:'12px', paddingBottom:'2px'}}><div>{elementArray[0]}</div></div> */}
           {/* <div style={{ fontSize: '12px', paddingBottom: '2px' }}>
          {firstSelectedElement}
        </div> */}
        <div style={{ fontSize: '12px', paddingBottom: '2px' }}>
           {elementArray.length > 1 ? handleClick(): (
    <div>
      {firstSelectedElement}
    </div>
  )}
</div>



              </div>
            </div>
            <br></br>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{ fontSize: '14px' }}>Element</span>
            
            <RadioGroup margin={1}
              onChange={function noRefCheck(){}}
              text=""
              value="Value 1"
            >
              <div style={{display:'flex',flexDirection:'row',alignItems:'start',justifyContent:'space-between',marginRight:'5px',height: '20px', width: '70px'}}>
              <Radio
                name="i"
                value="Value 1"
              />
              <Radio
                name="j"
                value="Value 2"
              />
              </div>
            </RadioGroup>
            
            </div>
            </div>
            <Separator /> 
            <div style={{display: 'flex',flexDirection:'column',margin:"10px",justifyContent:'space-between'}}>
            <span style={{ fontSize: '14px', color: 'gray',marginBottom:'6px' }}>Critical L.C from View by Max Value</span>
            <CheckGroup text="">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', height: 'fit-content', width: '100%',margin: '0',marginBottom:'6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Check name="Fx" width="100px" height="30px" />
            <div style={{marginRight:"0.3px"}}>
            <Check name="Fy" style={{ width: '100px', height: '30px' }} />
            </div>
            <div style={{marginRight: "4px"}}> <Check name="Fz" style={{  height: '30px', }} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',marginBottom:'5px' }}>
                <Check name="Mx" />
                <Check name="My" />
                <Check name="Mz" />
            </div>
        </div>
        <div style={{ display:'flex', alignItems:"centre",justifyContent:"centre", width: '100%', height: '80px' ,marginLeft:"0px"}}>
        <Button color="normal" onClick={function noRefCheck(){}} width="100%" variant="outlined" style={{ color: 'black'}}>
          Select All
        </Button>
        </div>
      </CheckGroup>
            </div>
      </Panel>
        </div>
          <br></br>
         <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', marginTop: '0', marginBottom: '30px' }}>
              {Buttons.NormalButton("contained", "Import Load Combinations", fetchData)}
              {Buttons.MainButton("contained", "Breakdown", BreakdownData)}
          </div>
      </Panel>
        
      </GuideBox>
	</div>
  );
}

function AppWithSnackbar() {
  return (
    <SnackbarProvider maxSnack={1}>
       <App />
    </SnackbarProvider>
  );
}


{/* export default AppWithSnackbar; */}
export default AppWithSnackbar;
