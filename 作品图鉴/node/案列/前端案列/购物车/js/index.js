function init() {
    let newproduct = product.map(item => {
        return `
            <li class="lis">
                    <div class="left">
                        <div class="img">
                            <img src="${item.img}" alt="" long="1">
                        </div>
                    </div>
                    <div class="right">
                        <div class="headertext"><span>${item.name}</span><span long="singleaggregateprice">${item.price}</span>元</div>
                        <div class="footernums">
                            <div class="countmodule">
                                <span class="iconfont" long="jian">&#xed21</span>
                                <span class="count" long="totalnum">0</span>
                                <span class="iconfont" long="add">&#xe601</span>
                            </div>
                        </div>
                    </div>
                </li>
            `
    }).join('')
    document.querySelector('.goods ul').innerHTML = newproduct;
}
init()
//获取所有的加
let add = document.querySelectorAll('.iconfont[long="add"]')
//获取商品数量
let totalnum = document.querySelectorAll('.count[long="totalnum"]')
//获取所有的减
let jian = document.querySelectorAll('.iconfont[long="jian"]')
//单个总价
let singleaggregateprice = document.querySelectorAll('span[long="singleaggregateprice"]')
//定义所有商品初始价格
let allprice = product.map(item => item.price)
//获取总价
let totalprice = document.querySelector('.totalprice')
//首先总价先要初始化
// totalprice.innerHTML = allprice.reduce((a, b) => a + b, 0)
//获取搜索按钮
let sousuo = document.querySelector('.sousuo')
//获取所有商品
let lis = document.querySelectorAll('.lis')
//获取没有搜索到商品时显示的元素
let noresult = document.querySelector('.noresult')
// 点击支付跳转到支付页面
let sumup = document.querySelector('.sumup button')
// 获取总余额
const overallbalance = document.querySelector('span[long="overallbalance"]')
//初始化总余额
overallbalance.innerHTML = localStorage.getItem('overallbalance')

sumup.addEventListener('click', () => {
    // 把总价存到本地里面
    localStorage.setItem('totalprice', totalprice.innerHTML)
    localStorage.setItem('overallbalance', overallbalance.innerHTML)
    let topricenum = parseInt(totalprice.innerHTML)
    let overallbalancenum = parseInt(overallbalance.innerHTML)
    //判断余额是否小于总价
    if (overallbalancenum < topricenum) {
        alert('余额不足')
        return
    }

    if (totalprice.innerHTML == 0) {
        alert('请选择商品')
    } else {
        location.href = '付款.html'
    }
})
//搜索功能
function search(products) {
    let val = document.querySelector('.inp input').value; //获取输入框的值
    if (val.trim()) {  //判断输入框是否有值
        for (let index = 0; index < products.length; index++) {  //第一个for循环为了搜索商品是否包含输入框的值
            const item = products[index];
            lis[index].style.display = 'none'; // 先将所有商品隐藏
            if (item.name.includes(val)) {
                lis[index].style.display = 'block'; // 如果商品名称包含输入框的值，则显示该商品
            }
            //只要商品一个为display为block，则显示没有搜索到商品时显示的元素
            for (let index = 0; index < lis.length; index++) {  //第二个for循环为了判断是否有商品显示方便判断是否有商品显示方便显示没有搜索到商品时显示的元素
                if (lis[index].style.display == 'block') {
                    noresult.style.display = 'none'
                    break
                }
                else {
                    noresult.style.display = 'block'
                }
            }

        }
    } else {
        alert('请输入关键字')
    }
}
sousuo.addEventListener('click', () => {
    search(product) //调用搜索函数，传入指定商品数组

})
//点击回车搜索
document.querySelector('.inp input').addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        search(product)
    }
})

//当输入框为空时
function empty() {
    if (document.querySelector('.inp input').value == '') {
        lis.forEach(item => item.style.display = 'block')
        noresult.style.display = 'none'
    }
}

document.querySelector('.inp input').addEventListener('input', empty)
//加减功能
function addorjian(i, totalnums, singleaggregateprices, totalprices) {
    totalnum[i].innerHTML = totalnums
    singleaggregateprice[i].innerHTML = singleaggregateprices
    totalprice.innerHTML = totalprices
}
for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('click', () => {
        let totalnums = parseInt(totalnum[i].innerHTML) + 1 //获取当前商品的数量，然后加1
        let singleaggregateprices = allprice[i] * totalnums //根据商品的数量以及商品的价格计算单个总价

        let totalprices = parseInt(totalprice.innerHTML) + allprice[i] //获取总价，然后累加

        addorjian(i, totalnums, singleaggregateprices, totalprices) //调用函数，传入下标，数量，单价，总价
    })
    jian[i].addEventListener('click', () => {
        let totalnums = parseInt(totalnum[i].innerHTML) - 1  //获取当前商品的数量，然后减1
        let singleaggregateprices = allprice[i] * totalnums //根据商品的数量以及商品的价格计算单个总价
        let totalprices = parseInt(totalprice.innerHTML) - allprice[i] //获取总价，然后累减
        if (totalnum[i].innerHTML > 0) {
            addorjian(i, totalnums, singleaggregateprices, totalprices) //调用函数，传入下标，数量，单价，总价
        } else {
            totalnum[i].innerHTML = 0
        }
    })
}