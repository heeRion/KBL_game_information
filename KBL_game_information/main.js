document.addEventListener('DOMContentLoaded', function () {
    const matchResults = document.getElementById('matchResults');
    const addGameForm = document.getElementById('addGameForm');
  
    // 모든 게임 가져오기
    function getAllGames() {
      fetch('/api/games')
        .then(response => response.json())
        .then(data => {
          renderMatchResults(data.games);
        })
        .catch(error => console.error('Error fetching all match results:', error));
    }
  
    // 새로운 게임 추가하기
    function addGame() {
      const formData = new FormData(addGameForm);
      const gameData = Object.fromEntries(formData.entries());
  
      fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        getAllGames(); //새 게임 추가 후 목록 새로 고침
      })
      .catch(error => console.error('Error adding game:', error));
    }
  
    // 경기 결과를 렌더링
    function renderMatchResults(results) {
      matchResults.innerHTML = '';
  
      if (results.length === 0) {
        matchResults.textContent = 'No match results found.';
        return;
      }
  
      results.forEach(game => {
        const gameInfo = document.createElement('div');
        gameInfo.innerHTML = `
          <strong>${game.team1} vs ${game.team2}</strong> - ${game.venue} - ${formatDate(game.date)} - Score: ${game.score || 'Not available'}<br>
          Comment: ${game.comment || 'No comment'}
        `;
        matchResults.appendChild(gameInfo);
      });
    }
  
    // 날짜 형식 지정
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      return new Date(dateString).toLocaleString('en-US', options);
    }
  
    // 초기 로드 - 모든 게임 가져오기
    getAllGames();
  });