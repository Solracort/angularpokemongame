import { Component, inject } from '@angular/core';
import { FightService } from 'src/app/services/fight.service';
import { fullPokemonData } from '../interfaces/pokemon.interface';
import { TeamSelectionService } from 'src/app/services/team-selection.service';

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent {
  private fightService = inject(FightService);
  private teamService  = inject(TeamSelectionService);
  public  pokemon100List:fullPokemonData[] =  [];
  
  public  mySquad :fullPokemonData[]= [];
  private enemySquadIds: number[] = [];
  public  myEnemySquad: fullPokemonData[]  = [];
  public attack:  {name:string,  myAction:string, power:number} = {name:'', myAction:"",power: 0} ;
  public defense: {name:string, myAction:string, power:number} = {name:'', myAction:"",power: 0} ;
  public lifeBarSquad : number=0;
  public lifeBarEnemy : number=0;
  public turnSquad : boolean = true;
  public visible: boolean = false;
  public pokemonActions : {name:string, myAction:string, power:number}[] =[]
  public action4show: {name:string, myAction:string, power:number} = {name:'', myAction:"",power: 0} ;
  private localStorageKeyEnemy = 'myEnemySquadData';
  private localStorageKeySquad =  'mySquadData';
  
  constructor(){
    this.pokemon100List = this.teamService.pokemonFullList;
    this.loadMyEnemySquadFromLocalStorage();
    this.loadMySquadFromLocalStorage();
    this.createMyEnemySquad();   
  };

  ngOnInit(){ 
    this.fighting();
    this.showActions();
    console.log(this.pokemonActions);
  }
  setEnemySquadIds(){ 
    while (this.enemySquadIds.length < 4) {
      const randomNumber = Math.floor(Math.random() * 100);

      if (!this.enemySquadIds.includes(randomNumber)) {
        this.enemySquadIds.push(randomNumber);
      }
    }
  };// firstly we get the ids for the enemy Squad
  pokemonFromFullList(id: number): fullPokemonData | undefined { 
    const foundPokemon: fullPokemonData | undefined = this.pokemon100List?.find(pokemon => pokemon.id === id);
    return foundPokemon;
  }; // we look for the id in the pokemon selected list
  createMyEnemySquad(){
    if (this.myEnemySquad.length !== 4){
      this.setEnemySquadIds();
      let i = 0;
      while (i < this.enemySquadIds.length){
        let foundPokemon:fullPokemonData | undefined = this.pokemonFromFullList(this.enemySquadIds[i]);
        console.log('Result de pokemonFromFullList:' , this.enemySquadIds[i], foundPokemon);
        if (foundPokemon !== undefined) { 
          this.myEnemySquad?.push(foundPokemon);
        };
        i++;
      }
      console.log('Enemies: ', this.myEnemySquad)
      this.saveMyEnemySquadToLocalStorage()
    }
  }; // we save the pokemons in an array to fight

  private loadMyEnemySquadFromLocalStorage() {
    const myEnemySquadData = localStorage.getItem(this.localStorageKeyEnemy);
    if (myEnemySquadData) {
      this.myEnemySquad = JSON.parse(myEnemySquadData);
    }
  }

  private loadMySquadFromLocalStorage() {
    const mySquadData = localStorage.getItem(this.localStorageKeySquad);
    if (mySquadData) {
      this.mySquad = JSON.parse(mySquadData);
    }
  }
  private saveMyEnemySquadToLocalStorage() {
    localStorage.setItem(this.localStorageKeyEnemy, JSON.stringify(this.myEnemySquad));
  }
  fighting(){
    let j : number = 0;
    this.lifeBarEnemy = this.myEnemySquad[j].stats[0].base_stat;

    for (let i=0;i< this.mySquad.length;i++){
      // if (j<this.myEnemySquad.length){
        this.lifeBarSquad = this.mySquad[i].stats[0].base_stat;
      // }
      while (this.lifeBarSquad>0 && j<this.myEnemySquad.length){
        
        if (this.turnSquad){ // depending on the turn, one attacks and the other defeats
           
          this.attack  = { ... this.fightService.attack(this.mySquad[i])};
          this.defense = { ... this.fightService.defense(this.myEnemySquad[j])};
          this.recordAction(this.attack);
          this.recordAction(this.defense);
                
          //if defense can´t stop the attack you reduce the lifeBarEnemy 
          if (this.attack.power - this.defense.power>0){
            this.lifeBarEnemy = this.lifeBarEnemy - (this.attack.power - this.defense.power);
          }  
                       
        } else{
          this.attack = { ... this.fightService.attack(this.myEnemySquad[j])};// my enemy attacks in his/her turn
          this.defense ={ ... this.fightService.defense(this.mySquad[i])};
          this.recordAction(this.attack);
          this.recordAction(this.defense);
          
          //if defense can´t stop the attack you reduce the lifeBarSquad 
          if (this.attack.power - this.defense.power>0){
            this.lifeBarSquad = this.lifeBarSquad - (this.attack.power - this.defense.power);
          }                 
        }
        if (i>=this.mySquad.length) this.recordAction({name:'Enemies', myAction: 'WIN!!!' , power:1000})
        this.changeTurn();//We always change turn after the loop
        if (this.lifeBarEnemy<=0){
          this.recordAction({name:this.myEnemySquad[j].name , myAction:"dies", power:0});
          j++; // We need to increase j to fight versus the next enemy
          if (j<this.myEnemySquad.length){
            this.recordAction({name:this.myEnemySquad[j].name, myAction:'Te elijo a ti!!!', power:0});
            this.lifeBarEnemy = this.myEnemySquad[j].stats[0].base_stat;
          }else {this.recordAction({name:'YOUR SQUAD', myAction:'WIN!!!!', power:1000})}  
        }
        if (this.lifeBarSquad<=0){
          this.recordAction({name:this.mySquad[i].name, myAction:' dies', power:0});
          if(this.mySquad[i+1]){
            this.recordAction({name:this.mySquad[i+1].name, myAction:'Te elijo a ti!!!', power:0});
          }else {this.recordAction({name:'Enemies', myAction:'WIN!!!! Score:', power:1000})}
        }
        
      }
    } 
  }

  recordAction(action:{name:string, myAction:string, power:number}){
    this.pokemonActions.push(action);       
  }
  showActions(){
    let speed = 2000;
    this.pokemonActions.forEach((element, index) => {
        setTimeout(()=>{
          this.action4show = {...element};
          this.visible=true;          
        }, index*speed)
        this.visible=false;
      
    });
  }
  changeTurn(){this.turnSquad = !this.turnSquad}
  
  ngOnDestroy(): void {
    
    localStorage.clear();
  }
}
