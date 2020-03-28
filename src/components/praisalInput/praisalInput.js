import React from 'react';

class PraisalInput extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            typeList: [],
            allNum: 0
        }
    }
  
    setItemData(item) {
  
        fetch("https://evemarketer.com/api/v1/types/search?q="+ item.name +"&language=zh&important_names=false")
        .then(res => {
            return res.json()
        })
        .then(result => {
            item.typeid = result[0].id
  
            return item;
        })
        .then(item => {
            let xml = new XMLHttpRequest;
            xml.open('get', "https://api.evemarketer.com/ec/marketstat/json?typeid="+ item.typeid +"&regionlimit=10000002");
            xml.onreadystatechange = () => {
                if (xml.readyState == 4 && xml.status == 200) {
                    let str = xml.response;
                    str = str.substr(1, xml.response.length - 3)
  
                    item = Object.assign(item, JSON.parse(str))
                    item.allNum = item.num * item.buy.max
  
                    this.setState(function (state, props) {
                        const list = state.typeList.concat(item);
                        const allNum = state.allNum + item.allNum;
  
                        return {
                            typeList: list,
                            allNum
                        }
                    })
  
                }
                this.props.parentSetAllNum(this.state.allNum);
            }
            xml.send()
        })
    }
    setTypeArray(event) {
  
        let str = this.textArea.value;
        let array = str.split("\n");
  
        array.forEach(async (item, i) => {
            let name = item.trim().substring(item.trim().search(/\s[0-9]/),0);
            let num = item.replace(",", "").match(/\s[0-9]+/g)[0].trim()
            let result = {
                "name": name,
                "num": num
            }
            this.setItemData(result)
        })
  
    }
  
    subInput(event) {
        this.setTypeArray(event);
    }
  
    render() {
        return (
            <div id="praisal-input">
                <textarea ref={ (textArea) => this.textArea = textArea }></textarea>
                <input type="text" className="btn btn-success" onClick={ this.subInput.bind(this) } defaultValue="提交"/>
                <input type="text" className="btn btn-danger" defaultValue="重置"/>
            </div>
        );
    }
  }

  export default PraisalInput