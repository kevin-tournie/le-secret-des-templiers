.PHONY: deploy

USER ?= user
IP ?= ip

deploy:
	pnpm run build
	rsync -avz -e 'ssh -i ~/.ssh/vps_info' ./.output/ $(USER)@$(IP):~/templier/
	rsync -avz -e 'ssh -i ~/.ssh/vps_info' ./drizzle/ $(USER)@$(IP):~/templier/drizzle/
	ssh -i ~/.ssh/vps_info $(USER)@$(IP) "source ~/.nvm/nvm.sh"