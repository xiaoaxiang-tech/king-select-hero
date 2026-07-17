const inps = document.querySelectorAll(".paypaw input");
// 输入密码
function inpdata(e) {
    let val = e.target.innerHTML
    for (let i = 0; i < inps.length; i++) {
        if (inps[i].value == "") {
            inps[i].value = val;
            checkpwd()
            break;
        }
    }
}
function del() {
    for (let i = inps.length - 1; i >= 0; i--) {
        if (inps[i].value != "") {
            inps[i].value = "";
            break;
        }
    }
}
// 清空密码
function emptyall() {
    for (let i = 0; i < inps.length; i++) {
        inps[i].value = "";
    }
}
// 获取头部的叉号
const cha = document.querySelector('.header span')
cha.addEventListener('click', () => {
    location.href = "购物车.html"
})
// 获取支付余额
const paytotle = document.querySelector('.paytotle')
paytotle.innerHTML = localStorage.getItem('totalprice')

// 获得设置密码容器
const setpwdbox = document.querySelector('.setpwd')
// 获取修改密码容器
const updatebox = document.querySelector('.updatepwd')

// 获取设置按钮
const setpwd = document.querySelector('span[long="setpwd"]')
// 获取修改密码按钮
const update = document.querySelector('span[long="updatepwd"]')

// 获取遮罩层
const mask = document.querySelector('.mask')
// 点击设置密码按钮
setpwd.addEventListener('click', () => {
    setpwdbox.style.top = `0px`
    mask.style.opacity = 1
    mask.style.pointerEvents = 'auto'

})
// 点击修改密码按钮
update.addEventListener('click', () => {
    updatebox.style.top = `0px`
    mask.style.opacity = 1
    mask.style.pointerEvents = 'auto'
})

// 关闭设置密码弹框
const close = document.querySelector('.close')
close.addEventListener('click', () => {
    setupdateshow()
    mask.style.opacity = 0
    mask.style.pointerEvents = 'none'
})
// 获取设置以及修改密码容器的高度
let setpwdHeight = setpwdbox.offsetHeight
let updateHeight = updatebox.offsetHeight

function setupdateshow() {
    setpwdbox.style.top = `-${setpwdHeight}px`
    updatebox.style.top = `-${updateHeight}px`
}
setupdateshow()

// 获取错误提示
const texterror = document.querySelector('.bodyinppwd p')
// 获取完成按钮
const complete = document.querySelector('.setpwd button')
// 获取设置密码输入框
const setpwdinput = document.querySelector('.setpwd input')

complete.addEventListener('click', () => {
    const regex = /^\d{6}$/; // 正则表达式，匹配6位数字
    if (regex.test(setpwdinput.value)) {
        texterror.style.display = 'none'
        alert("设置成功")
        setupdateshow()
        mask.style.opacity = 0
        mask.style.pointerEvents = 'none'
    } else {
        texterror.style.display = 'block'
        return
    }
    localStorage.setItem('paypwd', setpwdinput.value) //将密码存入到本地存储中
})

// 验证密码是否正确
function checkpwd() {
    //  检查输入密码框是否已经输满
    if (inps[0].value != "" && inps[1].value != "" && inps[2].value != "" && inps[3].value != "" && inps[4].value != "" && inps[5].value != "") {
        //与本地存储中的密码进行对比
        if (inps[0].value + inps[1].value + inps[2].value + inps[3].value + inps[4].value + inps[5].value === localStorage.getItem('paypwd')) {
            location.href = "购物车.html"
            alert("支付成功")
            //减少相对应的金额
            let totleprice = localStorage.getItem('overallbalance')
            localStorage.setItem('overallbalance', totleprice - localStorage.getItem('totalprice'))
        } else {
            alert("密码错误")
        }

    }
}








