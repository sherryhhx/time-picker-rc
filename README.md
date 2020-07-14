# time-picker-rc

## 描述

[github](https://github.com/sherryhhx/time-picker-rc) https://github.com/sherryhhx/time-picker-rc
```bash
一个时间投放选择插件
快速选择按钮迅速选中时间段
自由拖拽选择或取消某一些时间段
一键清除选择

```
![image](https://github.com/sherryhhx/time-picker-rc/blob/master/src/img/pic.jpg)

## Usage

```js
import  TimePicker from 'time-picker-rc'
    const data = {"Monday":"0,1,2,3,4,5,6,7,8,9,10,11","Tuesday":"0,1,2,3,4,5,6,7,8,9,10,11","Wednesday":"0,1,2,3,4,5,6,7,8,9,10,11","Thursday":"0,1,2,3,4,5,6,7,8,9,10,11","Friday":"0,1,2,3,4,5,6,7,8,9,10,11","Saturday":"0,1,2,3,4,5,6,7,8,9,10,11","Sunday":"0,1,2,3,4,5,6,7,8,9,10,11"}
    //data 为 json 对象
    // 其中外层  代表周一至周日
    // 内层 0-23 代表0点0分到23点59分 24个小时段 选中的时间段会在返回的 json 中
 <TimPicker
    data={data}
    onTimeChange={(data) => {
        console.log(data)
    }}
/>


```
