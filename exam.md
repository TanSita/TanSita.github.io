##What are the four activities that all software processes must have?
	Specification	規範（學姊寫定義 google說規範）
	Development (design and implent)	發展
	Validation	驗證
	Evolution	演化

* 100期中 (1)
* 102期中 (1)


##Please explain the following software process model. Please also show the model in block diagrams.
(a)	The Waterfall model
![Waterfall model](http://imgur.com/irYmnoe.jpg)
(b) Incremental development
![Incremental development](http://imgur.com/ShUac3H.jpg)

* 100期中 (2)
* 101期中 (1)
* 102期中 (2)
* 103考題 (2)


##Please provide two approaches to cope(應付) with software change.
	Change avoidance - prototype
	Change tolerance – increment develop 
	Spiral model 

	可以參考 Ch2  p.21

* 100期中 (3)
* 101期中 (5)
* 102期中 (3)
* 103考題 (3)


##Extreme programming is perhaps the most widely used agile method. It contains many special principles and practices for software development. Please give 5 principles or practices of extreme programming.

	Ch3 の p.11  principles
	Ch3 の p.16、p.17  practices

	從那一大堆裡面挑五個就讚讚讚


* 101期中 (3)
* 102期中 (4)


##Please list or draw the three phases in Scrum project management and briefly explain the work in each phase.

	Ch3 p.36

* 102期中 (5)


##Please provide 3 approaches to discover customer requirements.

	訪問、觀察跟分析人們如何work(不知道怎翻譯)、場景跟使用者故事
	Ch4 p.17

* 100期中 (5) --> 這裡是問requirement elicitation (要求獲取)
* 101期中 (4) --> 這裡是問requirement elicitation (要求獲取)
* 102期中 (6)

-------------------------

![quiz7](http://imgur.com/12YG6PN.jpg)
	討論個 :D

* 102期中 (7)
* 103考題 (6)


##Explain the following terminologies: 
### Alpha testing
	Alpha版本通常會送到開發軟體的組織或某群體中的軟體測試者作內部測試。

### Beta testing
	將軟件發佈出去給使用者，允許使用者去進行實驗以及測試，
	如果發生問題回報給開發人員知道。

### Regression testing
	回歸測試是指重複執行既有的全部或部分的相同測試。
	新加入測試的 module，可能對其他 module 產生 side effect，
	故須進行某些程度的回歸測試。
	回歸測試的重心，以關鍵性 module 為核心，以有關聯的 module 為輔。 

### Acceptance testing
	讓目標使用者親自使用，
	並測試該軟體是否滿足該目標使用者及其環境的實際需求，
	主要使用於客製系統中。

### Stress testing
	刻意讓系統超載來測試該系統故障的行為，是性能測試的一種

### Test-driven development
![Test-driven](http://imgur.com/k9GYOoM.jpg)

### Context models
	描述系統內部與外部動作的關係(多個 process)。

### Model-driven engineering
	在開發過程中 model 才是主要的輸出,而程序是從 model 中自動產出。

### Service-oriented systems
	是一種程式設計的方法，每個程式都只針對特定的任務執行，
	且互相獨立，可以拿來建構分佈式計算的應用程式。	

### COTS product reuse
	COTS 產品是為現有的系統設計的，不是客製化的，
	可供一般民眾購買，是企業打包封裝好的一種軟體，
	例如Microsoft Office就屬於COTS product. 

### Product lines
	用共同的架構發展出某種類型的應用程式，
	例如: hp printer ，每個產品的程式碼都類似，
	只針對使用者不同的需求稍微修改
	（將之前寫過功能類似的程式碼，拿來更改成為新產品）

### Application frameworks
	是一個抽象和具體類別的集合，
	運用物件導向的概念調整或擴充以符合使用者需求的reuse方式，
	使reuse的規模擴大，連架構都可以reuse.

### Plan-driven processes
	所有過程活動都是事先計劃好的，並根據此計劃衡量進度。

### Agile processes
	計劃是增量式的，更容易改變process以反映不斷變化的客戶需求。

* 100期中 (4)
* 100期末 (1)
* 100期末 (4)
* 101期中 (6)
* 101期末 (1)
* 101期末 (2)
* 101期末 (4)
* 102期末 (1)
* 102期末 (4)
* 102期末 (6)
* 103考題 (1)


##Please provide three major advantages of explicitly designing and documenting software architecture
	
	Stakeholder communication, System analysis, Large - scale reuse

* 100期末 (2)
* 101期末 (2)
* 102期末 (2)


##Please show the Model-View-Controller pattern and explain it briefly.
![MVC](http://imgur.com/wmZ3Fto.jpg)
![MVC2](http://imgur.com/099t4jl.jpg)

	Model : 管理資料
	View : 要顯示給使用者的畫面
	Controller : 協調View跟Model之間的互動


##Please describe the advantages and disadvantages of Model-View-Controller pattern

###優點
	https://zh.wikipedia.org/wiki/MVC##.E4.BC.98.E7.82.B9

	由於MVC模式的三個模組相互獨立，改變其中一個不會影響其他兩個。
	所以依據這種設計思想能構造良好的少互擾性的構件。
	同一個 Model 可以被不同的 View 重用，所以大大提高了代碼的可重用性。
	Controller 提高了應用程式的靈活性和可配置性。

###缺點
	當程式很簡單的時候，要刻意使用這個pattern反而顯得複雜。


* 101期末 (3)
* 102期末 (3)
* 103考題 (4)

-------------------------

![quiz5](http://imgur.com/RCkKMTy.jpg)
![ans5](http://imgur.com/1X4qFmo.jpg)
###過程
	X到Y（例如這例子是4到8）
	X-1 , X , (X+Y)/2 , Y , Y+1
	所以是測3,4,6,8,9
	右邊也一樣
	10000到99999
	所以是
	9999 , 10000 , 54999 , 99999 , 100000

###如果input=1(上面的是4~8)
	個人認為...（不確定唷）
	input = x , 測 x-1 , x , x+1
	所以就是測 0,1,2 

* 100期末 (5)
* 102期末 (5)
* 103考題 (5)


##還沒寫的

	100 期中 
	6
	7

	100 期末
	3
	6
	7

	101 期中
	7

	101 期末
	5
	6
	7

	102 期末
	7
	8

	103
	7
