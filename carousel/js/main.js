window.onload = function () {
    //ul元素节点
    let imgWrapper = document.getElementsByClassName("ul_img")[0];
    //li元素节点集合
    let imgArr = document.getElementsByClassName("li_img");
    //图片底部按钮节点集合
    let btnArr = document.getElementsByClassName("div_btn");
    //左右切换按钮节点集合
    let arrowArr = document.getElementsByClassName("arrow");
    //切换下一张按钮节点
    let prev = document.querySelector(".arrow_left");
    //切换上一张按钮节点
    let next = document.querySelector(".arrow_right");
    //li元素宽度即图片宽度
    let imgWidth = imgWrapper.children[0].offsetWidth;
    //图片计数
    let index = 0;
    //定时器
    let timer;

    //切换下一张按钮点击事件
    next.onclick = () => {
        if (index === imgWrapper.children.length - 1) {
            index = 0;
            imgWrapper.style.left = 0 + "px";
        }
        index++;
        animate(imgWrapper, -index * imgWidth);
        btnShow(); //同步按钮样式
    }

    //切换上一张按钮点击事件
    prev.onclick = () => {
        if (index === 0) {
            index = imgWrapper.children.length - 1;
            imgWrapper.style.left = -index * imgWidth + "px"
        }
        index--;
        animate(imgWrapper, -index * imgWidth);
        btnShow(); //同步按钮样式
    }

    //自动轮播
    let autoPlay = () => {
        timer = setInterval(() => {
            next.onclick();
        }, 3000);
    }

    autoPlay();

    //动态平移函数
    let animate = (element, target) => {
        clearInterval(element.timer);
        element.timer = setInterval(function () {
            let current = element.offsetLeft;//获取元素的当前的位置
            let step = 10;//每次移动的距离
            step = current < target ? step : -step;
            current += step;//当前移动到位置
            if (Math.abs(current - target) > Math.abs(step)) {
                element.style.left = current + "px";
            } else {
                clearInterval(element.timer);
                element.style.left = target + "px";
            }
        }, 0.001);
    }

    //图片底部按钮保持同步：排他思想(当前按钮添加样式，其他按钮移除该样式)
    let btnShow = () => {
        //特殊情况：当index为最后一张的时候，按钮应该显示第一张
        for (let i = 0; i < btnArr.length; i++) {
            if (i === index) {
                btnArr[i].classList.add("current");
            } else {
                btnArr[i].classList.remove("current");
            }
        }
        if (index === imgArr.length - 1) {
            btnArr[0].classList.add("current");
        }
    }

    //图片底部按钮悬停离开事件
    for (let i = 0; i < btnArr.length; i++) {
        //每个按钮添加下标属性
        btnArr[i].btnIndex = i;
        //鼠标悬停时
        btnArr[i].onmouseover = function () {
            //停止计时器
            clearInterval(timer);
            index = this.btnIndex;
            animate(imgWrapper, -index * imgWidth);
            btnShow();
        }
        //鼠标离开时
        btnArr[i].onmouseout = function () {
            //添加计时器
            autoPlay();
        }
    }

    //左右切换按钮悬停离开事件
    for (let i = 0; i < arrowArr.length; i++) {
        //鼠标悬停时
        arrowArr[i].onmouseover = function () {
            //停止计时器
            clearInterval(timer);
        }
        //鼠标离开时
        arrowArr[i].onmouseout = function () {
            //添加计时器
            autoPlay();
        }
    }
}
