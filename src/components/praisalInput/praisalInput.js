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
    setTypeArray() {
        let str = this.textArea.value;

        if (str) {
          let array = str.split("\n");

          if(array.length >= 1) {
            array.forEach(async (item, i) => {
                let name = item.trim().substring(item.trim().search(/\s[0-9]/),0);
                
                if (item.indexOf(',') >= 0) {
                  let num = item.replace(",", "").match(/\s[0-9]+/g)[0].trim();
                  let result = {
                      "name": name,
                      "num": num
                  }
                  this.setItemData(result)
                }

            })
          }
        }
    }

    subInput() {
        this.setTypeArray();
    }

    resetInput() {
        this.state.allNum = 0;
        this.props.parentSetAllNum(this.state.allNum);
        this.textArea.value = "";
    }

    render() {
        return (
            <div id="praisal-input">
                <textarea ref={ (textArea) => this.textArea = textArea }></textarea>
                <input type="text" className="btn btn-success" onClick={ this.subInput.bind(this) } defaultValue="提交"/>
                <input type="text" className="btn btn-danger" onClick={ this.resetInput.bind(this) } defaultValue="重置"/>
            </div>
        );
    }
  }

  export default PraisalInput
