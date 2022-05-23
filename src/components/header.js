import React from "react";

function SearchBar(){
    var val = document.getElementById("search-input").value;
    var opts = document.getElementById('search-bar').childNodes;
    for (var i = 0; i < opts[0].childNodes.length; i++) {
      if (opts[0].childNodes[i].value === val) {
        window.location.href=("/profile/" + opts[0].childNodes[i].value)
        break;
      }
    }
}

function Header() {
    return (
        <header className="App-header" id="App-header">
            <div className='inner-header'>
              <a href='/'><h3>Social Network</h3></a>
              <div className='header-search'><h3>
                <input list='search-bar' id='search-input' type="text" placeholder="Suche..." className='search-bar' onInput={SearchBar}/>
                <datalist id="search-bar"></datalist>
                </h3></div>
            </div>
        </header>
    );
}

export default Header;