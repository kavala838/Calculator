function display(id) {
    let displayEle = document.getElementById("displayField");
    let displayContent = document.getElementById(id).innerText;
    //<!--if(displayEle.innerText!==null)

    displayContent = displayEle.innerHTML + displayContent;

    displayEle.innerHTML = displayContent;

    result();
}


function displayOperator(id){
    let displayEle = document.getElementById("displayField");
    let displayContent=displayEle.innerHTML;
    let displayoper = document.getElementById(id).innerText;
    //<!--if(displayEle.innerText!==null)
    if(displayContent.length===0 && (id==="multiply" || id==="divide")){
        
    }
    else{
    if(displayContent.length!==0 && (displayContent[displayContent.length-1]==="+" || displayContent[displayContent.length-1]==="-") || displayContent[displayContent.length-1]==="*" || displayContent[displayContent.length-1]==="/"){
        displayContent=displayContent.substring(0,displayContent.length-1);
    }
    displayContent = displayContent + displayoper;

    displayEle.innerHTML = displayContent;

}
}


function cleardisplay(){
    let displayEle = document.getElementById("displayField");
    displayEle.innerHTML="";
    document.getElementById("ansDisplay").innerHTML="";
}

function clearOne(){
    let str = document.getElementById("displayField").innerText;
    if(str.length===0){}
    else if(str.length===1){
        cleardisplay();
    }
    else{
        let newStr=str.substring(0,str.length-1);
        document.getElementById("displayField").innerHTML=newStr;
    }
    result();
}

function displaydot(){
    let displayEle = document.getElementById("displayField");
    let content=displayEle.innerHTML+".";
    displayEle.innerHTML=content;
}

function result(){
    let str = document.getElementById("displayField").innerText;
    let ans=getresult(str);
    document.getElementById("ansDisplay").innerHTML=ans;
}

function getresult(str){

    console.log("started");
   // let str = document.getElementById("displayField").innerText;
    
   while(str.includes("(")){
       let startIndex=-1;
       let endIndex=-1;
       for(let i=str.length;i>=0;i--){
           if(str[i]==="("){
               startIndex=i;
               break;
           }
           if(str[i]===")"){
               endIndex=i;
           }
       }
       if(endIndex===-1){
           str=str+")";
           endIndex=str.length-1;
       }
       else{
           let ss2=str.substring(startIndex+1,endIndex);
           let ans1="";
           if(ss2.length!==0)
           {
           ans1=resultNoB(ss2);
           
           if(startIndex!==0 && str[startIndex-1]!=="+" && str[startIndex-1]!=="-" && str[startIndex-1]!=="*" && str[startIndex-1]!=="/" && str[startIndex-1]!=="("){
               ans1="*"+ans1;
           }
           if(endIndex!==str.length-1 && str[endIndex+1]!=="+" && str[endIndex+1]!=="-" && str[endIndex+1]!=="*" && str[endIndex+1]!=="/" && str[endIndex+1]!==")" && str[endIndex+1]!=="("){
               ans1=ans1+"*";
           }
           str=str.substring(0,startIndex)+ans1+str.substring(endIndex+1,str.length);
        }
        else{
            str=str.substring(0,startIndex);
        }
       }
       
    }
        if(str.includes(")")){
            let count=0;
            for(let i=0;i<str.length;i++){
                if(str[i]===")"){
                    count=count+1;
                }
            }
            let ss="(";
            ss=ss.repeat(count);
            str=ss+str;
            str=getresult(str);
        }

       

   

   

    return resultNoB(str);
   // document.getElementById("displayField").innerHTML=arr[0];
}

function resultNoB(str){

    if(str[0]==="-" || str[0]==="+"){
        str="0"+str;
    }

    if(str[str.length-1]==="+" || str[str.length-1]==="-" || str[str.length-1]==="*" || str[str.length-1]==="/"){
        str=str.substring(0,str.length-1);
    }

    var arr=new Array();  

    let i=0;
    let n=str.length;
    let s="";
    while(i<n){
        if(str[i]==="-"){
            s="-";
            i+=1;
        }
        else{
            s="";
        }
        while(i<n && str[i]!=="+" && str[i]!=="-" && str[i]!=="*" && str[i]!=="/"){
            s=s+str[i];
            i+=1;
        }
        if(s[s.length-1]==="."){
            s=s+"0";
        }
        if(s[0]==="."){
            s="0"+s;
        }
        arr.push(s);
        if(i<n){
            
            arr.push(str[i]);
            i+=1;
        }
    }
    console.log("array formed");
    let N=arr.length;
    while(arr.includes("/")){
        let x=0;
        let c="";
        for(let j=0;j<N;j++){
            if(arr[j]==="/"){
                let a=parseFloat(arr[j-1]);
                let b=parseFloat(arr[j+1]);
                c=(a/b).toString();
                console.log("division result"+c);
                x=j-1;
                break;
            }
        }
        arr.splice(x,3,c);
    }
    console.log("/1");
    while(arr.includes("*")){
        let x=0;
        let c="";
        for(let j=0;j<N;j++){
            if(arr[j]==="*"){
                let a=parseFloat(arr[j-1]);
                
                let b=parseFloat(arr[j+1]);
                c=(a*b).toString();
                console.log("multiplication result "+c);
                x=j-1;
                break;
            }
        }
        arr.splice(x,3,c);
    }
    while(arr.includes("-")){
        console.log("entered");
        let x=0;
        let c="";
        for(let j=0;j<N;j++){
            if(arr[j]==="-"){
                let a=parseFloat(arr[j-1]);
                let b=parseFloat(arr[j+1]);
                console.log(a-b);
                let ans=a-b;
                c=(ans).toString();
                console.log("subtraction result "+c);
                x=j-1;
                console.log(arr[0]);
                break;
                
            }
        }
        arr.splice(x,3,c);
        console.log(arr);
    }

    while(arr.includes("+")){
        let x=0;
        let c="";
        for(let j=0;j<N;j++){
            if(arr[j]==="+"){
                let a=parseFloat(arr[j-1]);
                console.log(a);
                let b=parseFloat(arr[j+1]);
                c=(a+b).toString();
                console.log("addition result "+c);
                x=j-1;
                break;
            }
        }
        arr.splice(x,3,c);
    }
    console.log(arr);
    console.log(arr[0]);
    
    console.log("calculation ended");
    console.log(arr[0]);
    return arr[0];
}