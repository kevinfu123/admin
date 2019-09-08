import request from '@/utils/request'

export function Category() {
 
  return request({
    url:'/toolsSkillCategory',
    method:'GET'
  })
}


export function deleteCategory(id) {
  return request({
    url:'/toolsSkillCategory/'+id,
    method:'DELETE',
  })
}

export function editCategorytool(id,params) {
    return request({
        url:'/toolsSkillCategory/'+id,
        method:'PATCH',
        data:params
    })
}

