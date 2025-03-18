import {request} from '@/utils/request.js'

export function apiGetBanner(){
	return request({url:"/banner.php"})
	
}

export function apiGetRandom(){
	return request({url:"/random.php",data:{batch:9}})
}

export function apiGetNotice(){
	return request({url:"/notice.php"})
}

export function apiGetClassify(){
	return request({url:"/classify.php"})
}