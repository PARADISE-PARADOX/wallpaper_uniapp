import {request} from '@/utils/request.js'

export function apiGetBanner(data={}){
	return request({
		url:"/banner.php",
		data
	})
}

export function apiGetRandom(data={}){
	return request({
		url:"/random.php",
		data:{batch:9},
	})
}

export function apiGetNotice(data={}){
	return request({
		url:"/notice.php",
		data
	})
}

export function apiGetClassify(data={}){
	return request({
		url:"/classify.php",
		data
	})
}

export function apiGetClassList(data={}){
	return request({
		url:"/wallpaperlist.php",
		data
	})
}