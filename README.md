# 점프 플러딩 알고리즘
JFA ( Jump Flooding Algorithm )는 보로노이 다이어그램 및 distance transform 구성에 사용되는 flooding algorithm.  
[위키](https://ko.wikipedia.org/wiki/%EC%A0%90%ED%94%84_%ED%94%8C%EB%9F%AC%EB%94%A9_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)  

# 동작원리 
- [기본개념영상](https://www.youtube.com/watch?v=A0pxY9QsgJE) 
- 초기화 단계에서 입력 이미지의 각 픽셀에 대해 초기 거리 값을 설정. 
- 픽셀 간 거리를 계산하고 갱신하는 단계를 반복적으로 수행합니다.
  - 이웃 픽셀 중 가장 작은 거리 값을 찾고, 이를 자신의 거리 값으로 업데이트합니다.
  - 위 과정을 모든 픽셀에 반복하며 적용.

- 픽셀 간 거리는 대체로 Euclidean distance를 이용. 
  - 다른 거리 메트릭을 사용할 수도 있습니다.

# 배운 것
- 제너레이터를 통해 연산이 많은 루프문을 나눠서 표현가능.
- 제너레이터에 중복은 함수 안에서만 가능.
- voronoi를 만드는 다양한 방법



## 참고링크
- (Jump Flooding Algorithm)[https://www.comp.nus.edu.sg/~tants/jfa.html]
- (Jump Flooding)[https://observablehq.com/@esperanc/jump-flooding]