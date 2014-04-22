var spawn = require('child_process').spawn,
	colors = require('colors');
	ps = require('ps');
	

var RESPAWN_DELAY = 1000;


function ProcessManager(){
	this.childProcesses = [];		
}

ProcessManager.prototype.spawn = function(proc,args,autorespawn,pipestdout){
	
	var self = this;
	var child = spawn(proc,args);
	
	if(pipestdout){
		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function (data) {
				console.log(data);
		});
	}
	
	child.on('exit', function (code,signal) {
			console.log('[Process Manager] '+this.pid+' exited with code '.red+code+' and signal '.red+signal);
			var i = self.getProcessIndex(this.pid);			
			if(i !== -1){
				self.childProcesses.splice(i,1);
				if(autorespawn){
					console.log("[Process Manager]".yellow+" shoot again !");
					setTimeout(function(){
							self.spawn(proc,args,autorespawn,pipestdout);
					},RESPAWN_DELAY);
				}
			}
	});
	child.on('error', function (err) {
			console.log('[Process Manager] '+this.pid+'  error : '+err);
			var i = self.getProcessIndex(this.pid);			
			if(i !== -1){
				self.childProcesses.splice(i,1);
				if(autorespawn){
					console.log("[Process Manager]".yellow+" shoot again !");
					setTimeout(function(){
							self.spawn(proc,args,autorespawn,pipestdout);
					},RESPAWN_DELAY);
				}
			}
			
			this.kill('SIGTERM');// just in case of zombie attack
	});
	
	this.childProcesses.push(child)
	console.log(('[Process Manager] ').green+proc+' started with pid '+child.pid);	
}

ProcessManager.prototype.killAll = function(){
	for (var i in this.childProcesses) this.kill(this.childProcesses[i].pid);
}

ProcessManager.prototype.kill = function(pid){
	
	var i = this.getProcessIndex(pid);
	if(i == -1) return console.log("[Process Manager]".yellow+" pid doesn't exists");
	
	this.childProcesses[i].kill('SIGTERM');
	this.childProcesses.splice(i,1);
	
	console.log('[Process Manager] '.red+pid+' killed');
}

ProcessManager.prototype.getProcessIndex = function(pid){
	var k=0;
	while(k<this.childProcesses.length && this.childProcesses[k].pid !== pid)
		k++;
	if(k<this.childProcesses.length)
		return k;
	else
		return -1;
}

ProcessManager.prototype.cleanZombies = function(processName) {
	
	var self = this;
	ps.lookup(
		{
			command: processName+'+',
			psargs: 'ux'
		}, 
		function(err, resultList ) 
		{
			if (err) throw new Error( err );
			
			resultList.forEach(function( process )
			{
				if (( process ) && ( self.getProcessIndex(parseInt(process.pid)) ))
				{
					ps.kill( process.pid , function( err ) 
					{
						if (err) throw new Error( err );
						else console.log( ('[Process Manager] '+processName+' zombie '+process.pid+' killed').yellow );
					});			
				}
			});
		}
	);
}


 module.exports = ProcessManager;
