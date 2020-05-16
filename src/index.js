import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import marked from "marked";
import * as $ from 'jquery';

marked.setOptions({
    breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: plaseHolder,
        }
        this.handleChange = this.handleChange.bind(this);
        this.closeOpen = this.closeOpen.bind(this);
        this.focuse = this.focuse.bind(this);
        this.blur = this.blur.bind(this);
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    closeOpen() {
        $('#editor').slideToggle(500);
    }

    focuse() {
        if(this.state.input === plaseHolder)
        this.setState({
            input: ''
        })
    }

    blur() {
        if (this.state.input === '') {
            this.setState({
                input: plaseHolder
            })
        }
    }

    render() {
        return (
            <div>
                <p id='rahnama'>برای ظاهر شدن راهنما ویرایشگر را خالی کرده و بیرون از آن را کلیک نمایید</p>
                <div id='editor-div'>
                    <div className="top-window" id='editor-top'>
                        <button className="btn-close" onClick={this.closeOpen}><img className="close"
                                                                                    src="https://img.icons8.com/material-sharp/24/000000/close-window.png"
                                                                                    alt=''/></button>
                        <div className="topic"><img src="https://img.icons8.com/ios/20/000000/atom-editor.png" alt=''/>
                        </div>
                        <p className="topic" id="topic-pre">وارد کردن</p>
                    </div>
                    <textarea onFocus={this.focuse} onBlur={this.blur} id="editor" value={this.state.input}
                              onChange={this.handleChange}/>
                </div>
                <div id="preview">
                    <div className="top-window">
                        <button className="btn-close" onClick={this.closeOpen}><img className="close"
                                                                                    src="https://img.icons8.com/material-sharp/24/000000/close-window.png"
                                                                                    alt=''/></button>
                        <div className="topic"><img src="https://img.icons8.com/ios/24/000000/atom-editor.png" alt=''/>
                        </div>
                        <p className="topic">نتیجه</p>
                    </div>
                    <div id='reflector'
                         dangerouslySetInnerHTML={{__html: marked(this.state.input, {renderer: renderer})}}/>
                </div>
            </div>
        )
    }
}

const plaseHolder =
    `# خوش آمدین به ویرایشگر کد و نوشتار من

## این یک عنوان فرعی است
### و اینجا چیز های جالب دیگری نیز وجود دارد...
  
دراینجا یک کد یک خطی \`<div></div>\` رو میشه ساخت.

\`\`\`
//با این علامت میشه یک بلوک کد ساخت

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
همچنین میتونین متن رو **درشت** کنین **Bold**
یا _مورب_.
یا... هم که... **_جفتش!_**
یا اینکه از میان کلمات ~~خطی عبور دهید~~

همچنین میتوانید [لینک](https://codepen.io/Mahdibayat72), یا حتی یک بلوک
> بلوک نقل‌قول!

و اگه واقعا میخواین قدرت این ویرایشگر رو ببینین حتی در ایجاد جدول

سر تیتر اول | سرتیتر سوم | سرتیتر دوم
------------ | ------------- | ------------- 
محتوات میتونه  | اینجا | و اینجا قرار بگیره
و همچنین | بعله | فکر کنم متوجه شدین

- و البته که اینجا یک لیست داریم
    - و تعدادی سر لیست گلوله ای
        - با سطوح مختلف تو رفتگی
            - مثل این

1. و اینجا یک لیست شماره ای داریم :
1. میشه فقط از شماره ۱ استفاده کرد
1. اما خود ویرایشگر ادامه میده...
- حتی اگه خط فاصله یا براکت بگذارید
* و نکته آخر بیاید تصاویر رو هم ایجاد کنیم :

![لوگوی ری‌اکت w/ متن](https://goo.gl/Umyytc)
`

ReactDOM.render(
    <React.StrictMode>
        <Markdown/>
    </React.StrictMode>,
    document.getElementById('root')
);
