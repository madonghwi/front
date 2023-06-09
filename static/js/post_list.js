// 카테고리별 (팔로잉) 게시글 리스트 보기
window.onload = async function loadCategoryPosts() {
    // url에서 카테고리 이름을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");


    // url에 파라미터 q가 있으면 팔로잉 게시글을 가져오는 함수를 실행하고
    // 없으면 전체 게시글을 가져오는 함수를 실행함
    // 카테고리 이름을 매개변수로 백엔드에서 해당 카테고리의 글들을 가져옴
    if (urlParams.has("q")) {
        posts = await getFollowingPosts(categoryName)
    } else {
        posts = await getPosts(categoryName)
    }

    const postCategoryList = document.getElementById("post-category-list")
    postList(posts, postCategoryList);
}