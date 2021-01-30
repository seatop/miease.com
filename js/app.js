$(function(){

	var cuob;
	var pswd="";
	var pswdk="";
	var pswdl=12;

	function randomChar (size) {
		var x="23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
		var tmp="";
		for(var i=0;i<size;i++){
			tmp +=x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		}
		return tmp;
	}

	function passwordBit (text,size) {
		var x=text;
		var tmp="";
		for(var i=0;i<size;i++){
			tmp +=x.charAt(i+1);
		}
		return tmp;
	}

	function ssrandom(a,b){
		return Math.random()>0.5?-1:1;
	}

	numstr='空退.#_+/*$@0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';	
	nsarr=numstr.split("");
	outss='<div id="s_all"><div id="s_fonts">';
	for(i=0;i<nsarr.length;i++){
		outss+='<div class="s_font">'+nsarr[i]+'</div>';
	}		
	outss+='</div></div>';

	outinput='<div id="p_ss"><ul><li>输入密码关键词 <input type="password" id="ps1" /></li><li>重复密码关键词 <input type="password" id="ps2" /></li><li><h1 id="btps">确定</h1></li></ul></div>';

	outinputk='<div id="p_ss"><ul><li>输入附加关键词 <input type="text" id="psk" /></li><li><h1 id="btpsk">确定</h1></li></ul></div>';

	outinputl='<div id="p_ss"><ul><li><h2 id="ps_l">当前密码长度为： '+pswdl+'</h2></li></ul></div>';

	outn='<div id="s_all"><div id="s_fonts">';
	for(i=4;i<31;i++){
		outn+='<div class="n_font">'+i+'</div>';
	}		
	outn+='</div></div>';

	$("#app-right").html(outinput+outss);

	$("#app-left li:eq(0)").css({"background":"#bcd","color":"#789"});
    
	$("#ps1").focus();

	cuob=$("#ps1");

	$(document).delegate('#ps1','focus',function(){
		cuob=$(this);
		$("#btps").html("确定");
	});

	$(document).delegate('#ps2','focus',function(){
		cuob=$(this);
		$("#btps").html("确定");
	});

	$(document).delegate('#ps3','focus',function(){
		cuob=$(this);
		$("#btpsk").html("确定");
	});
    
    $("#about").click(function(){
    	$("#app-left li").css({"background":"#789","color":"#bcd"});
        outabout='<div id="p_ss"><ul><li id="aboutt">关于</li><li class="aboutl">用记忆中的关键词生成无意义密码。</li><li class="aboutl">纯JS程序，MD5多重加密，可存至本地运行。</li><li class="aboutl">密码关键词为空时，生成随机密码。</li><li class="aboutl">附加关键词可用于区分不同的用途。</li><li class="aboutl">本程序仅供参考，不承担任何责任。</li><li class="aboutl">作者微博：weibo.com/seatop</li><li class="aboutl">联系邮箱：seatop@sina.cn</li><li class="aboutl">源码下载：seatop.com.cn/pswd</li></ul></div>';
		$("#app-right").html(outabout);        
    });

	$(document).delegate('.s_font','mouseover',function(){
		$(this).css({'background':'#ccc','cursor':'pointer','color':'#fff'});
	});	
	$(document).delegate('.s_font','mouseout',function(){
		$(this).css({'background':'#fff','color':'#000'});
	});
	$(document).delegate('.s_font','click',function(){
		$("#btps").html("确定");
		$("#btpsk").html("确定");
		if($(this).html()=="空"){
			cuob.val('');
			cuob.focus();
		}else if($(this).html()=="退"){
			var vlen=cuob.val().length;
			if(vlen>0){
				cuob.val(cuob.val().substring(0,vlen-1));
			}
		}else{
			cuob.val(cuob.val()+$(this).html());
		}
	});

	$(document).delegate('.n_font','mouseover',function(){
		$(this).css({'background':'#ccc','cursor':'pointer','color':'#fff'});
	});	
	$(document).delegate('.n_font','mouseout',function(){
		$(this).css({'background':'#fff','color':'#000'});
	});
	$(document).delegate('.n_font','click',function(){
		pswdl=$(this).html();
		outinputl='<div id="p_ss"><ul><li><h2 id="ps_l">当前密码长度为： '+pswdl+'</h2></li></ul></div>';
		$("#app-right").html(outinputl+outn);
	});

	$("#app-left li:eq(0)").click(function(){
		$("#app-right").html(outinput+outss);
		$("#ps1").focus();
		cuob=$("#ps1");
	});

	$("#app-left li:eq(1)").click(function(){
		$("#app-right").html(outinputk+outss);
		$("#psk").focus();
		cuob=$("#psk");
	});

	$("#app-left li:eq(2)").click(function(){
		$("#app-right").html(outinputl+outn);		
	});

	$("#app-left li:eq(3)").click(function(){
		if(pswd==""){
			outp=randomChar(pswdl);
			$("#app-right").html('<div id="p_ss"><ul><li><h3>系统生成的随机密码为</h2></li><li><h3>'+outp+'</h3></li><li><h3>如若使用此密码，请妥善保管！</h3></li></ul></div>');
		}else{
			if(pswdk==""){
				var ptemp=hex_md5(pswd);
				ptemp=passwordBit(ptemp,pswdl);
				ptemp=hex_md5(ptemp);
				outp=passwordBit(ptemp,pswdl);
				$("#app-right").html('<div id="p_ss"><ul><li><h3>由密码关键词，系统生成的密码为</h2></li><li><h3>'+outp+'</h3></li><li><h3>如若使用此密码，请记好密码关键词！</h3></li></ul></div>');
			}else{
				var ptemp=hex_md5(pswd + pswdk);
				ptemp=passwordBit(ptemp,pswdl);
				ptmep=hex_md5(pswdk + ptemp + pswdk);
				outp=passwordBit(ptmep,pswdl);
				$("#app-right").html('<div id="p_ss"><ul><li><h3>由密码及附加关键词，系统生成的密码为</h2></li><li><h3>'+outp+'</h3></li><li><h3>如若使用此密码，请记好两个关键词！</h3></li></ul></div>');
			}
		}			
	});

	$(document).delegate("#btps","click",function(){
		if ($("#ps1").val()==$("#ps2").val()) {
			pswd=$("#ps1").val();
			$("#btps").html('密码关键词输入成功！');		
		} else{
			$("#btps").html('两次输入的密码不一致！');
			pswd="";
		};
	});

	$(document).delegate("#btpsk","click",function(){		
		pswdk=$("#psk").val();
		$("#btpsk").html('附加关键词输入成功！');	
	});

	$("#app-left li").click(function(){
		$("#app-left li").css({"background":"#789","color":"#bcd"});
		$(this).css({"background":"#bcd","color":"#789"});
	});

});