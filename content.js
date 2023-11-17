let runCounter = true;

//Runs extension once buttons are clicked
document.addEventListener('click', ({ target }) => {
    if (target.textContent == "Search" && document.getElementById("title-panel").textContent.includes("Register for Classes")) {
        waitLoad(false, 1500);
    }
    else if (target.textContent == "Search" && document.getElementById("title-panel").textContent.includes("Browse Classes")) {
        waitLoad(false, 1500);
    }
    else if (target.textContent == "View Sections") {
        waitLoad(true, 1500);
    }
    else if (target.textContent == "Search Again") {
        runCounter = true;
    }
    else if (target.textContent == "Back To Search Results") {
        runCounter = true;
        waitLoad(true, 1500);
    }
    else if(target == (document.getElementsByClassName("paging-control next ltr enabled"))[0]){
        runCounter = true;
        waitLoad(false, 1500);
    }
    else if(target == (document.getElementsByClassName("paging-control previous ltr enabled"))[0]){
        runCounter = true;
        waitLoad(false, 1500);
    }
    else if(target == (document.getElementsByClassName("paging-control first ltr enabled"))[0]){
        runCounter = true;
        waitLoad(false, 1500);
    }
    else if(target == (document.getElementsByClassName("paging-control last ltr enabled"))[0]){
        runCounter = true;
        waitLoad(false, 1500);
    }
    else if (target.textContent == "Ok") {
        let errors = document.getElementsByClassName("notification-flyout-item secondary");
        for(let i = 0; i < errors.length; i++){
            errors[i].click();
        }
    }
    
    
});

//Runs extension if Enter key is pressed 
document.addEventListener('keydown', function(event) {
    const tableTitle = document.getElementsByClassName("results-title");
    if (event.key === "Enter" && document.getElementById("title-panel").textContent.includes("Register for Classes") && tableTitle) {
        waitLoad(false, 1500);
    }
    else if (event.key === "Enter" && document.getElementById("title-panel").textContent.includes("Browse Classes")) {
        waitLoad(false, 1500);
    }
});


//Function to set a delay to fix registration table not loading punctually
function waitLoad(l, time){
    if(runCounter){
        runCounter = false;
        const timeout = setTimeout(load.bind(null, l), time);
    }
    
}

//Reverse String Function
function reverse(s){
    return s.split("").reverse().join("");
}

//Function to pull Course Difficulty
async function pull(course, table, i){
    response = await fetch('https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/gviz/tq?tqx=out:json');
    data = await response.text();
    data = data.slice(data.indexOf("{"), data.lastIndexOf(");"));
    sheet = JSON.parse(data).table;
    let difficulty = "No Data in Database";
    let number = 0;
    //Accounting for alternate course names
    if(course == "ANTH006"){
        course = "MUS006";
    }
    else if(course == "AST023"){
        course = "CPLT023";
    }
    else if(course == "AST046"){
        course = "CPLT046";
    }
    else if(course == "BIOL104"){
        course = "BPSC104";
    }
    else if(course == "CRWT066"){
        course = "TFDP066";
    }
    else if(course == "CS011"){
        course = "MATH011";
    }
    else if(course == "CS120A"){
        course = "EE120A";
    }
    else if(course == "CS120B"){
        course = "EE120B";
    }
    else if(course == "ENGR108"){
        course = "HIST108";
    }
    else if(course == "ENGR109"){
        course = "HIST109";
    }
    else if(course == "ENTM162"){
        course = "BIOL162";
    }
    else if(course == "HIST044"){
        course = "RLST044";
    }
    else if(course == "JPN023"){
        course = "CPLT023";
    }
    else if(course == "LING162"){
        course = "PSYC128";
    }
    else if(course == "MCS006"){
        course = "ART006";
    }
    else if(course == "ME144"){
        course = "EE144";
    }
    else if(course == "STAT127"){
        course = "BUS127";
    }
    for (let i = 0; i < sheet.rows.length; i++) {
        if((sheet.rows[i].c[0] != null) && (sheet.rows[i].c[0].v == course)){
            difficulty = sheet.rows[i].c[1].f;
            number = i + 3;
        }
    }
    if(difficulty != "No Data in Database"){
        let linkHead = "https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/edit#gid=0&range=A";
        linkHead = linkHead.concat(number);
    
        const link = document.createElement("a");
        link.textContent = difficulty;
        link.href = linkHead;
        link.target = "_blank";
        table.rows[i].cells[8].append(link);
    }
    else{
        table.rows[i].cells[8].appendChild(document.createTextNode(difficulty));
    }
    table.rows[i].cells[8].style.textAlign = "center";
}

//Adds Rate My Professor column to registration table
let counter = 0;
function load(l){
    if(l){
        counter = 0;
    }
    const table = document.getElementById("table1");
    if(table != null){
        const headerRow = table.rows[0];
        const verifyTable = headerRow.cells[0].textContent;
        if(verifyTable.includes("CRN")){
            //Creates header label
            
            if(counter == 0){
                //UI Improvements
                headerRow.cells[0].textContent = "CRN";
                headerRow.cells[0].style.textAlign = "center";
                headerRow.cells[1].textContent = "Subject";
                headerRow.cells[1].style.textAlign = "center";
                headerRow.cells[3].textContent = "Course Number";
                headerRow.cells[4].textContent = "Subject";
                headerRow.cells[5].textContent = "Title";
                headerRow.cells[5].style.textAlign = "center";
                headerRow.cells[7].textContent = "Meeting Times";
                headerRow.cells[7].style.textAlign = "center";
                headerRow.cells[7].style.width = "120.05469px";
                headerRow.cells[9].textContent = "Instructor";
                headerRow.cells[9].style.textAlign = "center";
                headerRow.cells[10].textContent = "Status";
                headerRow.cells[10].style.textAlign = "center";
                const cdCell = table.rows[0].cells[8];
                cdCell.textContent = "Online?";
                cdCell.style.textAlign = "left";
                cdCell.style.width = "50px";
                const cell9 = headerRow.insertCell(9);
                cell9.setAttribute('style', 'white-space: pre;');
                cell9.textContent = "Rate My \r\n";
                cell9.textContent += "Professor";
                cell9.style.textAlign = "center";
                headerRow.deleteCell(2);
                headerRow.insertCell(8).textContent = "Course Difficulty";
                headerRow.cells[8].style.textAlign = "center";
                const settings = document.getElementsByClassName("column-visibility-menu");
                for(let i = 0; i < settings.length; i++){
                    settings[i].remove();
                }
                
            }    
                
            //Adds RMP cell to each row
            for(let i = 1; i < table.rows.length; i++){
                const cell = table.rows[i].insertCell(9);
                let prof = table.rows[i].cells[10].textContent;
                //Collects Professor Name
                if(table.rows[i].cells[7].textContent.includes("Lecture")){
                    prof = prof.substring(0, prof.indexOf("(Primary)") - 1);
                    prof = prof.replace(/\n/g, " ");
                    let rProf = reverse(prof);
                    prof = rProf.substring(0, rProf.indexOf(" "));
                    prof = reverse(prof);
                    rProf = rProf.substr(rProf.indexOf(","));
                    let rProfFirst;
                    if(rProf.indexOf(" ") != -1){
                        rProfFirst = rProf.substring(1, rProf.indexOf(" "));
                    }
                    else{
                        rProfFirst = rProf.substr(1);
                    }
                    rProfFirst = reverse(rProfFirst);
                    //Appends name to text box
                    let constant = 0;
                    let finalString = prof.concat(" ");
                    finalString = finalString.concat(rProfFirst);
                    //Nicknames
                    if(finalString == "Kristen Miller"){
                        finalString = "Kris Miller";
                    }
                    else if((finalString == ". Staff") || (prof == "")){
                        const cellText = document.createTextNode("Instructor not yet available");
                        cell.appendChild(cellText);
                        constant++;
                    }
                    else if((finalString == "Amr Ahmed")){
                        finalString = "Amr Magdy";
                    }
                    //Creates link to professor search on RMP website.
                    if(constant == 0){
                        let linkHead = "https://www.ratemyprofessors.com/search/professors/1076?q=";
                        linkHead = linkHead.concat(finalString.substring(0, finalString.indexOf(" ")));
                        const linkTail = "%20";
                        linkHead = linkHead.concat(linkTail);
                        linkHead = linkHead.concat(finalString.substring(finalString.indexOf(" ") + 1, finalString.length));
                        const link = document.createElement("a");
                        link.textContent = finalString;
                        link.href = linkHead;
                        link.target = "_blank";
                        cell.append(link);
                    }
                    constant--;
                }
                else{
                    const cellText = document.createTextNode("N/A");
                    cell.appendChild(cellText);
                }
            }
            //Center Units Column
            for(let i = 1; i < table.rows.length; i++){
                const cell = table.rows[i].cells[6];
                cell.style.textAlign = "center";
            }
            //Compact Meeting Times Column
            for(let i = 1; i < table.rows.length; i++){
                const cell = table.rows[i].cells[7];
                
                cell.setAttribute('style', 'white-space: pre;');
                let pillBox = cell.querySelector(".ui-pillbox");
                let index = cell.textContent.indexOf("-") - 10;
                let meetingString = document.createTextNode("\r\n" + cell.textContent.slice(index, index + 5)
                + cell.textContent.slice(index + 7, index + 17) + cell.textContent.slice(index + 19, index + 22));
                cell.textContent = "";
                cell.appendChild(pillBox);
                if(meetingString.textContent.includes("AM") || meetingString.textContent.includes("PM")){
                    cell.appendChild(meetingString);
                }
                else{
                    let asynchronousString = document.createTextNode("\r\nAsynchronous Class");
                    cell.appendChild(asynchronousString);
                }
            }
            
            //Change Online Column
            for(let i = 1; i < table.rows.length; i++){
                const cell = table.rows[i].cells[8];

                cell.style.textAlign = "center";
                if(cell.textContent = "In-Person"){
                    cell.textContent = "IP";
                }
            }

            //Delete Course Description Column
            for(let i = 1; i < table.rows.length; i++){
                if(counter == 0){
                    table.rows[i].deleteCell(2);
                }
                else{
                    table.rows[i].deleteCell(0);
                }
            }
            
            //Add Course Difficulty Column
            for(let i = 1; i < table.rows.length; i++){
                table.rows[i].insertCell(8);
                let course = table.rows[i].cells[1].textContent.concat(table.rows[i].cells[2].textContent);
                pull(course, table, i);
            }
            counter++;

        }
    }

    //Detection for changing the count per page
    let option = (document.getElementsByClassName("page-size-select"))[0];
    if(option != null){
        option.addEventListener('change', function(event){
            runCounter = true;
            waitLoad(false, 2500);
        });
    }
}