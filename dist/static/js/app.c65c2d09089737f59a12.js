webpackJsonp([1],{"/+qE":function(t,e){},CbKQ:function(t,e,a){"use strict";var s=a("Dd8w"),n=a.n(s),i=a("mtWM"),r=(a.n(i),a("NYxO")),c=a("7+uW");a("wmV6");e.a={props:{videoName:String},data:function(){return{streamList:this.videoName,player:null,ref:"twitch-embed-"+Math.floor(9999*Math.random())+1}},created:function(){var t=this;c.a.loadScript("https://player.twitch.tv/js/embed/v1.js").then(function(){var e={width:100,height:100,channel:t.videoName,autoplay:!0};t.player=new window.Twitch.Player(t.$refs.ref,e),t.player.addEventListener("ready",function(){console.log("stream created ready !!!!")})})},computed:{controlPlay:function(){this.player&&(this.$store.state.allStreamArePaused?this.player.pause():this.player.play())},controlMute:function(){this.player&&this.player.setMuted(this.$store.state.allStreamAreMuted)}},methods:n()({removeOne:function(){this.removeOneStreamSelected({stream:this.videoName})}},a.i(r.b)({removeOneStreamSelected:"removeOneStreamSelected"}))}},FGQs:function(t,e,a){"use strict";var s=a("Dd8w"),n=a.n(s),i=a("mtWM"),r=(a.n(i),a("NYxO")),c=(a("wtEF"),a("QNn3"),a("lg/M"));e.a={name:"menu",data:function(){return{errors:[],show:!1,search:"",state:"close"}},created:function(){this.getGames(),this.$store.state.gameSelected=""},methods:n()({setSelectedGame:function(t){this.$store.commit("ALWAYS_OPEN_LIST_STREAM"),this.handleNewGameSelected({game:t})}},a.i(r.b)({getGames:"getGames",handleNewGameSelected:"handleNewGameSelected"})),computed:{results:function(){if(this.search.length>0&&"open"===this.state){var t=this;return this.$store.state.gameList.filter(function(e){return e.game.name.toLowerCase().indexOf(t.search.toLowerCase())>=0})}}},components:{globalSearch:c.a}}},G4e1:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-menu"},[a("div",{staticClass:"main-menu__search"})])}],i={render:s,staticRenderFns:n};e.a=i},Ikd4:function(t,e){},JNiX:function(t,e,a){"use strict";function s(t){a("UHCg")}var n=a("WX4X"),i=a("G4e1"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,"data-v-77c5e7f5",null);e.a=o.exports},JaUR:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-cont-games"},[a("div",{staticClass:"main-cont-games__search"},[a("div",{staticClass:"main-cont-games__search__title",on:{mouseover:function(e){t.show=!0},mouseleave:function(e){t.show=!1}}},[a("div",[a("span",{staticClass:"twitch"},[t._v("T")]),t._v(" "),a("span",{staticClass:"hide",class:{w:t.show}},[t._v("w")]),t._v(" "),a("span",{staticClass:"hide",class:{i:t.show}},[t._v("i")]),t._v(" "),a("span",{staticClass:"hide",class:{t:t.show}},[t._v("t")]),t._v(" "),a("span",{staticClass:"hide",class:{c:t.show}},[t._v("c")]),t._v(" "),a("span",{staticClass:"hide",class:{h:t.show}},[t._v("h")])]),t._v(" "),a("div",{class:{letters:t.show}},[a("span",{staticClass:"screens",class:{sMove:t.show}},[t._v("S")]),t._v(" "),a("span",{staticClass:"hide",class:{w:t.show}},[t._v("c")]),t._v(" "),a("span",{staticClass:"hide",class:{i:t.show}},[t._v("r")]),t._v(" "),a("span",{staticClass:"hide",class:{t:t.show}},[t._v("e")]),t._v(" "),a("span",{staticClass:"hide",class:{c:t.show}},[t._v("e")]),t._v(" "),a("span",{staticClass:"hide",class:{h:t.show}},[t._v("n")]),t._v(" "),a("span",{staticClass:"hide",class:{s:t.show}},[t._v("s")])]),t._v(" "),a("span",{staticClass:"line"})]),t._v(" "),a("div",{staticClass:"main-cont-games__search__cont-search"},[a("label",{attrs:{"data-state":t.state,for:"search"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"inputText",attrs:{placeholder:"Search a game",name:"searchGame",required:""},domProps:{value:t.search},on:{click:function(e){t.state="open"},input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),a("span",{staticClass:"floating-label",attrs:{required:""}},[t._v(t._s(this.$store.state.gameSelected))]),t._v(" "),a("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"},on:{click:function(e){t.state="close",t.search=""}}})]),t._v(" "),a("ul",{staticClass:"main-cont-games__search__cont-search__ul"},t._l(t.results,function(e){return a("li",{staticClass:"main-cont-games__search__cont-search__ul__li"},[a("router-link",{attrs:{to:{name:"game",params:{name:e.game.name}}},nativeOn:{click:function(a){t.setSelectedGame(e.game.name),t.state="open"}}},[a("img",{attrs:{src:e.game.box.small,alt:""}}),t._v(" "),a("span",[t._v(t._s(e.game.name))])])],1)}))])]),t._v(" "),a("ul",{staticClass:"main-cont-games__ul"},t._l(this.$store.state.gameList,function(e){return a("li",{staticClass:"main-cont-games__ul__li"},[a("router-link",{attrs:{to:{name:"game",params:{name:e.game.name}}},nativeOn:{click:function(a){t.setSelectedGame(e.game.name)}}},[a("img",{attrs:{src:e.game.box.large}}),t._v(" "),a("div",{staticClass:"cont-infos-game"},[a("h2",[t._v(t._s(e.game.name))]),t._v(" "),a("p",[t._v(t._s(e.viewers)+" viewers")]),t._v(" "),a("p",[t._v(t._s(e.channels)+" channels")])])])],1)}))])},n=[],i={render:s,staticRenderFns:n};e.a=i},Je6Y:function(t,e){},M93x:function(t,e,a){"use strict";function s(t){a("Je6Y")}var n=a("xJD8"),i=a("hAPP"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,null,null);e.a=o.exports},MEnm:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",class:{"container-full":!t.showGames}},[a("div",{staticClass:"container__main-game"},[a("div",{staticClass:"container__main-game__header left"},[a("div",{staticClass:"container__main-game__header__main-search__cont-search"},[a("label",{staticClass:"container__main-game__header__main-search__cont-search__label",attrs:{"data-state":t.state,for:"search"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"inputText",attrs:{name:"searchGame",required:""},domProps:{value:t.search},on:{blur:function(e){t.unFocus()},input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),a("span",{staticClass:"floating-label",attrs:{required:""}},[t._v("\n              "+t._s(this.$store.state.gameSelected)+"\n            ")]),t._v(" "),a("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"},on:{click:function(e){t.search=""}}})]),t._v(" "),a("ul",{staticClass:"container__main-game__header__main-search__cont-search__ul"},[t.search.length>0&&this.$store.state.gameSelected.length>0?a("li",{staticClass:"container__main-game__header__main-search__cont-search__ul__li first"},[a("span",[t._v(t._s(this.$store.state.gameSelected))]),t._v(" "),a("i",{staticClass:"fas fa-check"})]):t._e(),t._v(" "),t._l(t.results,function(e){return a("li",{staticClass:"container__main-game__header__main-search__cont-search__ul__li"},[a("router-link",{attrs:{to:{name:"game",params:{name:e.game.name}}},nativeOn:{mousedown:function(a){t.setSelectedGame(e.game.name),t.state="open"}}},[a("img",{attrs:{src:e.game.box.small,alt:""}}),t._v(" "),a("span",[t._v(t._s(e.game.name))])])],1)})],2)])]),t._v(" "),a("div",{staticClass:"container__main-game__cont-right"},[a("div",{staticClass:"container__main-game__cont-right__header right"},[a("menuTop")],1),t._v(" "),a("h1",{staticClass:"container__main-game__cont-right__title"},[a("router-link",{attrs:{to:{name:"home"}}},[t._v("\n            Twitch Screens\n          ")])],1)]),t._v(" "),this.$store.state.streamListPlaying.length>0?a("div",{staticClass:"container__main-game__cont-right__controls"},[a("div",{staticClass:"container__main-game__cont-right__controls__button",on:{click:t.muteAllStream}},[this.$store.state.allStreamAreMuted?t._e():a("i",{staticClass:"fas fa-volume-up sound"}),t._v(" "),this.$store.state.allStreamAreMuted?a("i",{staticClass:"fas fa-volume-off"}):t._e()]),t._v(" "),a("div",{staticClass:"container__main-game__cont-right__controls__button",on:{click:t.pauseAllStream}},[this.$store.state.allStreamArePaused?a("i",{staticClass:"fas fa-play"}):t._e(),t._v(" "),this.$store.state.allStreamArePaused?t._e():a("i",{staticClass:"fas fa-pause"})]),t._v(" "),a("div",{staticClass:"container__main-game__cont-right__controls__button",on:{click:t.removeAllStream}},[a("i",{staticClass:"far fa-times-circle"})])]):t._e()]),t._v(" "),a("streamList",{attrs:{showGames:t.showGames,list:t.streamList}}),t._v(" "),a("ul",{staticClass:"container__ul",class:{"container-full__ul-open":!this.$store.state.showStreamList}},t._l(this.$store.state.streamListPlaying,function(t){return a("li",{staticClass:"container__ul__li",class:{hideitmotherfucker:"undefined"===t}},[a("stream",{attrs:{videoName:t}})],1)}))],1)},n=[],i={render:s,staticRenderFns:n};e.a=i},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=a("M93x"),i=a("YaEn"),r=a("wmV6"),c=a("wtEF"),o=a("NYxO"),l=a("MU8w");a.n(l);s.a.use(o.a),s.a.use(r.a),s.a.config.productionTip=!1,new s.a({el:"#app",store:c.a,router:i.a,template:"<App/>",components:{App:n.a}})},QNn3:function(t,e,a){"use strict"},QUk0:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return"undefined"!==t.videoName?a("span",{attrs:{videoName:t.videoName}},[a("div",{ref:"ref",staticClass:"main-stream"},[a("div",{staticClass:"main-stream__remove",on:{click:t.removeOne}},[a("i",{staticClass:"fas fa-times"})])]),t._v("\n  "+t._s(t.controlPlay)+"\n  "+t._s(t.controlMute)+"\n")]):t._e()},n=[],i={render:s,staticRenderFns:n};e.a=i},SVgy:function(t,e,a){"use strict";var s=a("oYf7"),n=a("mtWM"),i=(a.n(n),a("NYxO"),a("wtEF"),a("QNn3"),a("lg/M"));e.a={props:{list:Array,showGames:Boolean},data:function(){return{sortStream:!1,showListStreams:!0,streamIsPlaying:!1,allStreamNamePlaying:[]}},methods:{selectStream:function(t,e){var a=t.channel.name,s=this.$store.state.streamListPlaying;s.includes(a)?this.$emit("clicked",this.err):(s.push(a),this.allStreamNamePlaying=s,this.$store.commit("SET_STREAM_PLAYING",s))},showList:function(){this.$store.commit("SHOW_LIST_STREAM")},selectSort:function(t){if(this.sortElement=t,"Alphabetical"===t){var e=function(t,e){return t.channel.name<e.channel.name?-1:t.channel.name>e.channel.name?1:0};return this.sortStream=!0,this.$store.state.streamList.sort(e)}if("Viewers"===t){var a=function(t,e){return e.viewers-t.viewers};return this.sortStream=!1,this.$store.state.streamList.sort(a)}}},components:{stream:s.a,globalSearch:i.a}}},UHCg:function(t,e){},UT4N:function(t,e){},WPPy:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-search"},[a("div",{staticClass:"main-search__cont-search"},[a("label",{attrs:{"data-state":t.state,for:"search"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"inputText",attrs:{name:"searchGame",required:""},domProps:{value:t.search},on:{click:function(e){t.state="open"},input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),a("span",{staticClass:"floating-label",attrs:{required:""}},[t._v(t._s(this.$store.state.gameSelected))]),t._v(" "),a("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"},on:{click:function(e){t.state="close",t.search=""}}})]),t._v(" "),a("ul",{staticClass:"main-search__cont-search__ul"},[t.search.length>0&&this.$store.state.gameSelected.length>0?a("li",{staticClass:"main-search__cont-search__ul__li first"},[a("span",[t._v(t._s(this.$store.state.gameSelected))]),t._v(" "),a("i",{staticClass:"fas fa-check"})]):t._e(),t._v(" "),t._l(t.results,function(e){return a("li",{staticClass:"main-search__cont-search__ul__li"},[a("router-link",{attrs:{to:{name:"game",params:{name:e.game.name}}},nativeOn:{click:function(a){t.setSelectedGame(e.game.name),t.state="open"}}},[a("img",{attrs:{src:e.game.box.small,alt:""}}),t._v(" "),a("span",[t._v(t._s(e.game.name))])])],1)})],2)])])},n=[],i={render:s,staticRenderFns:n};e.a=i},WX4X:function(t,e,a){"use strict";var s=a("Dd8w"),n=a.n(s),i=a("mtWM"),r=(a.n(i),a("NYxO")),c=(a("wtEF"),a("QNn3"),a("lg/M"));e.a={name:"menuTop",props:{allGames:Array},data:function(){return{state:"close",isShowSearch:!1,gameSelected:"",search:"",gameList:[],searchProps:"game"}},methods:n()({selectGame:function(t){this.$store.commit("SET_GAME",t),this.gameSelected=t,this.getStreams()}},a.i(r.b)({getStreams:"getStreams"})),computed:{searchGame:function(){var t=this;if(this.gameList){var e=this;return this.gameList.filter(function(a){return t.isShowSearch=!0,a.game.name.toLowerCase().indexOf(e.search.toLowerCase())>=0})}}},components:{globalSearch:c.a}}},YaEn:function(t,e,a){"use strict";var s=a("7+uW"),n=a("/ocq"),i=a("aTr5"),r=a("wUZA");s.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"home",component:r.a},{path:"/game/:name",name:"game",component:i.a,props:{game:!0,content:!1}}]})},aTr5:function(t,e,a){"use strict";function s(t){a("Ikd4")}var n=a("dHkL"),i=a("MEnm"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,"data-v-bfd8cbfa",null);e.a=o.exports},dHkL:function(t,e,a){"use strict";var s=a("Dd8w"),n=a.n(s),i=a("mtWM"),r=(a.n(i),a("JNiX")),c=a("wsJ1"),o=a("oYf7"),l=a("lg/M"),m=a("NYxO");a("wtEF"),a("QNn3");e.a={name:"game",data:function(){return{showGames:!0,streamList:[],err:"",search:"",searchedGames:[],state:"open",isShowList:!0,noResult:!1}},created:function(){this.handleNewGameSelected({game:this.$route.params.name}),this.getGames(),this.isOpen&&(this.state="open")},methods:n()({muteAllStream:function(){this.$store.commit("SET_STREAM_MUTED")},pauseAllStream:function(){this.$store.commit("SET_STREAM_PAUSED")},removeAllStream:function(){this.$store.commit("SET_STREAM_REMOVE"),this.$store.commit("ALWAYS_OPEN_LIST_STREAM")},setSelectedGame:function(t){this.$store.commit("ALWAYS_OPEN_LIST_STREAM"),this.$router.push("/game/"+t),this.handleNewGameSelected({game:t})},unFocus:function(){this.search=""}},a.i(m.b)({getGames:"getGames",handleNewGameSelected:"handleNewGameSelected"})),computed:{results:function(){if(this.search.length>0&&"open"===this.state){var t=this;return this.$store.state.gameList.filter(function(e){return e.game.name.toLowerCase().indexOf(t.search.toLowerCase())>=0})}}},components:{menuTop:r.a,streamList:c.a,stream:o.a,globalSearch:l.a}}},eeCL:function(t,e,a){"use strict";var s=a("Dd8w"),n=a.n(s),i=a("mtWM"),r=(a.n(i),a("NYxO"));a("wtEF"),a("QNn3");e.a={name:"global-search",props:{isOpen:Boolean},data:function(){return{search:"",state:"close"}},created:function(){this.getGames(),this.isOpen&&(this.state="open")},methods:n()({setSelectedGame:function(t){this.handleNewGameSelected({game:t})}},a.i(r.b)({getGames:"getGames",handleNewGameSelected:"handleNewGameSelected"})),computed:{results:function(){if(this.search.length>0&&"open"===this.state){var t=this;return this.$store.state.gameList.filter(function(e){return e.game.name.toLowerCase().indexOf(t.search.toLowerCase())>=0})}}}}},hAPP:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("meta",{attrs:{charset:"utf-8"}}),t._v(" "),a("link",{attrs:{rel:"shortcut icon",type:"image",href:"../static/assets/favicon-32x32.png"}}),t._v(" "),a("link",{attrs:{rel:"stylesheet",href:"https://use.fontawesome.com/releases/v5.0.10/css/all.css",integrity:"sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg",crossorigin:"anonymous"}}),t._v(" "),a("router-view")],1)},n=[],i={render:s,staticRenderFns:n};e.a=i},jtpa:function(t,e){},kaxi:function(t,e){},"lg/M":function(t,e,a){"use strict";function s(t){a("kaxi")}var n=a("eeCL"),i=a("WPPy"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,"data-v-5b0bec51",null);e.a=o.exports},oM0n:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-stream",class:{"main-stream-show":!this.$store.state.showStreamList}},[a("ul",{staticClass:"main-stream__ul"},[a("div",{staticClass:"main-stream__ul__select"},[a("div",{staticClass:"main-stream__ul__select__viewers",class:{sort:!1===t.sortStream},on:{click:function(e){t.selectSort("Viewers")}}},[a("i",{staticClass:"fas fa-eye"}),t._v(" "),a("span",[t._v("Viewers")])]),t._v(" "),a("div",{staticClass:"main-stream__ul__select__alpha",class:{sort:!0===t.sortStream},on:{click:function(e){t.selectSort("Alphabetical")}}},[a("i",{staticClass:"fas fa-sort-alpha-down"}),t._v(" "),a("span",[t._v("Alpha")])])]),t._v(" "),t._l(this.$store.state.streamList,function(e){return a("li",{staticClass:"main-stream__ul__li",on:{click:function(a){t.selectStream(e)}}},[a("img",{staticClass:"main-stream__ul__li__img",attrs:{src:e.channel.logo}}),t._v(" "),a("div",{staticClass:"main-stream__ul__li__infos"},[a("span",{staticClass:"main-stream__ul__li__infos__name"},[t._v(t._s(e.channel.display_name))]),t._v(" "),a("div",{staticClass:"main-stream__ul__li__infos__views"},[a("div",{staticClass:"main-stream__ul__li__infos__views__online"}),t._v(" "),a("span",{staticClass:"main-stream__ul__li__infos__views__viewers"},[t._v(t._s(e.viewers))])])]),t._v(" "),t.allStreamNamePlaying.includes(e.channel.name)&&t.$store.state.streamListPlaying.length>0?a("div",{staticClass:"main-stream__ul__li__cont-play"},[a("i",{staticClass:"fas fa-play"})]):t._e()])})],2),t._v(" "),a("div",{staticClass:"main-stream__cont-cross",class:{openList:!this.$store.state.showStreamList},on:{click:function(e){t.showList()}}},[a("i",{staticClass:"fas fa-chevron-left main-stream__cont-cross__cross"})])])},n=[],i={render:s,staticRenderFns:n};e.a=i},oYf7:function(t,e,a){"use strict";function s(t){a("UT4N")}var n=a("CbKQ"),i=a("QUk0"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,null,null);e.a=o.exports},wUZA:function(t,e,a){"use strict";function s(t){a("jtpa")}var n=a("FGQs"),i=a("JaUR"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,"data-v-26e7f720",null);e.a=o.exports},wsJ1:function(t,e,a){"use strict";function s(t){a("/+qE")}var n=a("SVgy"),i=a("oM0n"),r=a("VU/8"),c=s,o=r(n.a,i.a,c,"data-v-043afd8f",null);e.a=o.exports},wtEF:function(t,e,a){"use strict";var s=a("7+uW"),n=a("NYxO"),i=a("mtWM"),r=a.n(i);s.a.use(n.a);var c=new n.a.Store({state:{gameList:[],gameListSlug:[],streamList:[],gameSelected:"",streamListPlaying:[],showStreamList:!0,allStreamAreMuted:!1,allStreamArePaused:!1},mutations:{GET_GAMES:function(t,e){t.gameListSlug=e,t.gameList=e},GET_STREAMS:function(t,e){t.streamList=e},SET_GAMES:function(t,e){t.gameList=e},SET_GAME:function(t,e){t.gameSelected=e},SET_STREAM_PLAYING:function(t,e){t.streamListPlaying=e},SET_STREAM_MUTED:function(t){t.allStreamAreMuted=!t.allStreamAreMuted},SET_STREAM_REMOVE:function(t){t.streamListPlaying=[]},SET_STREAM_REMOVE_ONE:function(t,e){var a=t.streamListPlaying.indexOf(e);-1!==a&&t.streamListPlaying.splice(a,1,"undefined")},SET_STREAM_PAUSED:function(t){t.allStreamArePaused=!t.allStreamArePaused},SHOW_LIST_STREAM:function(t){t.showStreamList=!t.showStreamList},ALWAYS_OPEN_LIST_STREAM:function(t){t.showStreamList=!0}},actions:{getGames:function(t){var e=t.commit;return r.a.get("/games").then(function(t){e("GET_GAMES",t.data.top)}).catch(function(t){console.log(t)})},getStreams:function(t,e){var a=t.commit;t.state;return r.a.get("/streams/"+e).then(function(t){a("GET_STREAMS",t.data.streams)}).catch(function(t){console.log(t)})},handleNewGameSelected:function(t,e){var a=t.commit,s=t.dispatch,n=e.game;a("SET_GAME",n),s("getStreams",n)},removeOneStreamSelected:function(t,e){var a=t.commit;t.dispatch;a("SET_STREAM_REMOVE_ONE",e.stream)}}});e.a=c},xJD8:function(t,e,a){"use strict";e.a={name:"app"}}},["NHnr"]);