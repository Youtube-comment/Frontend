import "./tutorial.css"

function Tutorial(){
    return(
        <div className="tutorial_page">
            <div className="tutorial_containor">
                <div className="tutorial_logo">
                    <h2 className="tutorial_item">Tutorial</h2>
                </div>
                <div className="tutorial_main">
                    <div className="tutorial_one">
                        1. 로그인 하기
                    </div>
                    <div className="tutorial_two">
                        2. 메인화면
                    </div>
                    <div className="tutorial_three">
                        3. 메뉴바애에서 videos 클릭
                    </div>
                    <div className="tutorial_four">
                        4. 댓글 관리를 할 영상 선택
                    </div>
                    <div className="tutorial_five">
                        5. 댓글 리스트 중 원하는 댓글 선택
                    </div>
                    <div className="six">
                        6. 답글을 직접 작성 or GPT에게 답글 작성 요청
                    </div>
                    <div className="seven">
                        7. 삭제하고싶은 댓글 삭제
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tutorial;