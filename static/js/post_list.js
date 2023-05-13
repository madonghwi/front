console.log("post list js 로드됨")


// 카테고리별 (팔로잉) 게시글 리스트 보기
window.onload = async function loadCategoryPosts() {
    // url에서 카테고리 이름을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");

    console.log(categoryName)

    // url에 파라미터 q가 있으면 팔로잉 게시글을 가져오는 함수를 실행하고
    // 없으면 전체 게시글을 가져오는 함수를 실행함
    // 카테고리 이름을 매개변수로 백엔드에서 해당 카테고리의 글들을 가져옴
    if (urlParams.has("q")) {
        posts = await getFollowingPosts(categoryName)
    } else {
        posts = await getPosts(categoryName)
    }

    // 게시글 목록 UI
    const postCategoryList = document.getElementById("post-category-list")

    posts.forEach(post => {
        console.log(post)
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        newCol.setAttribute("onclick", `postDetail(${post.pk})`)

        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card h-100")
        newCard.setAttribute("id", `post-${post.pk}`)
        newCol.appendChild(newCard)

        const postImage = document.createElement("img")
        postImage.setAttribute("class", "card-img-top")

        if (post.image) {
            postImage.setAttribute("src", `${backend_base_url}${post.image}`)
        } else {
            postImage.setAttribute("src", "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2")
        }
        newCard.appendChild(postImage)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)

        const newCardTile = document.createElement("h5")
        newCardTile.setAttribute("class", "card-title")
        newCardTile.innerText = post.title
        newCardBody.appendChild(newCardTile)

        postCategoryList.appendChild(newCol)
    });
}